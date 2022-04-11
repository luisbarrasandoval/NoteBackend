import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import TheUsernameAlreadyExistsException from '../exceptions/TheUsernameAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import { isEmail } from 'class-validator';
import createToken from '../utils/createToken';
import sessionsModel from '../models/sessions.model';
import RequestWithUser from '../interfaces/RequestWithUser';

const info = (req: RequestWithUser, res: Response) => {
  const user = req.user;
  res.send(user);
};

const sessions = async (req: RequestWithUser, res: Response) => {
  const sessions = await sessionsModel.find({user: req.user, status: true})
  res.send(sessions)
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // email puede ser un email o un nombre de usuario
  // email is email or username

  const user = await userModel.findOne(
    isEmail(email) ? { email } : { username: email }
  );

  if (!user) {
    return next(new WrongCredentialsException(email));
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return next(new WrongCredentialsException(email));
  }

  // const session = await sessionsModel.findOne({ userId: user._id });
  // console.log(session);
  // if (session) {
  //   if (session.token === req.headers.authorization?.split(' ')[1]) {
  //     return res.status(200).json({
  //       message: 'Session already exists',
  //       token: session.token
  //     });
  //   }

  //   return res.send({
  //     message: 'Ya existe una sesion activa'
  //   });
  // }

  const token = createToken(user);
  const new_session = await sessionsModel.create({
    user: user,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true,
    token
  });

  if (!new_session) {
    return next(new Error('Error al crear la sesion'));
  }

  res.setHeader('Authorization', 'Bearer ' + token);
  res.send(user.toJSON());
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, firstName, lastName, email, password, role } = req.body;

  // search existing email
  const _email = await userModel.findOne({ email });
  if (_email) {
    return next(new UserWithThatEmailAlreadyExistsException(email));
  }

  // search existing username
  const _username = await userModel.findOne({ username });
  if (_username) {
    return next(new TheUsernameAlreadyExistsException(username));
  }

  const newUser = new userModel({
    username,
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 10),
    role
  });

  await newUser.save();
  res.send(newUser);
};

export { login, register, info, sessions };
