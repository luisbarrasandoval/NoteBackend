import {NextFunction, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import AuthenticationExpiredException from '../exceptions/AuthenticationExpiredException';
import HttpException from '../exceptions/HttpException';
import InvalidTokenException from '../exceptions/InvalidTokenException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import RequestWithUser from '../interfaces/RequestWithUser';
import sessionsModel from '../models/sessions.model';
import userModel from '../models/user.model';
import {DataStoredInToken} from '../utils/createToken';
import validarToken from '../utils/validarToken';
import bcrypt from 'bcrypt';
import authConfig from '../config/auth.config';
import TwoFactorAuthenticationRequiredException from '../exceptions/TwoFactorAuthenticationRequiredException';

async function authenticationMiddleWare(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
    validatePassword = false,
) {
  const {authorization} = req.headers;

  if (!authorization) {
    return next(new WrongCredentialsException());
  }

  const token = authorization.split(' ')[1];
  // validate token
  let valid: DataStoredInToken;
  try {
    valid = validarToken(token) as DataStoredInToken;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      await sessionsModel.findOneAndUpdate({token}, {status: false});
      return next(new AuthenticationExpiredException());
    } else if (error instanceof JsonWebTokenError) {
      return next(new InvalidTokenException());
    }

    return next(new HttpException(500, 'Error desconocido'));
  }

  if (!valid) {
    return next(new WrongCredentialsException());
  }

  const session = await sessionsModel.findOneAndUpdate(
      {token},
      {updatedAt: new Date()},
  );

  if (!session) {
    return next(new WrongCredentialsException());
  }
  if (session.status === false) {
    return next(new WrongCredentialsException());
  }

  // refractor this
  if (validatePassword) {
    if (session.doubleCheck) {
      const start = new Date(session.doubleCheck);
      const end = new Date();
      const diff = end.getTime() - start.getTime();
      const diffMinutes = Math.floor(diff / 60000);
      if (diffMinutes > authConfig.doubleCheckExpire &&
        req.body.passwrod ) {
        return next(new AuthenticationExpiredException());
      }
    } else {
      const password = req.body.password;
      if (!password) {
        return next(new TwoFactorAuthenticationRequiredException());
      }

      await sessionsModel.updateOne({token}, {doubleCheck: new Date()});

      const user = await userModel.findById(session.user);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new Error('Contraseña incorrecta'));
      }
    }
  }

  req.user = session.user;
  req.token = token;
  next();
}

export default authenticationMiddleWare;
