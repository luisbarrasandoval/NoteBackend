import bcrypt from "bcrypt";
import { isEmail } from "class-validator";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import sessionsModel from "../models/sessions.model";
import userModel from "../models/user.model";
import createToken from "../utils/createToken";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
import TheUsernameAlreadyExistsException from "../exceptions/TheUsernameAlreadyExistsException";
import IUser from "../interfaces/user.interface";
import InvalidEmailException from "../exceptions/InvalidEmailException";
import { userID } from "../interfaces/RequestWithUser";

export interface Register extends Omit<IUser, "_id" | "create_at"> {}

const create_session = async (user: IUser, ip: string, userAgent: string) => {
  const {token, expiresIn} = createToken(user);
  const new_session = await sessionsModel.create({
    user: user,
    userAgent: userAgent,
    ip: ip,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true,
    token,
    expiresIn: expiresIn,
  });

  return { token, new_session };
};

const login = async (
  email: string,
  password: string,
  ip: string,
  userAgent: string
): Promise<Error | { token: string; user: IUser }> => {
  const user = await userModel.findOne(
    isEmail(email) ? { email } : { username: email }
  );

  if (!user) {
    return new WrongCredentialsException(email);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return new WrongCredentialsException(email);
  }

  const { token, new_session } = await create_session(user, ip, userAgent);
  if (!new_session) {
    return new Error("Error al crear la sesion");
  }

  return { token, user: user };
};

const register = async (
  user: Register,
  ip: string,
  userAgent: string
): Promise<Error | { token: string; user: IUser }> => {
  const { email, username, firstName, lastName, password } = user;

  if (!isEmail(email)) {
    return new InvalidEmailException(email);
  }

  const _email = await userModel.findOne({ email });
  if (_email) {
    return new UserWithThatEmailAlreadyExistsException(email);
  }

  // search existing username
  const _username = await userModel.findOne({ username });
  if (_username) {
    return new TheUsernameAlreadyExistsException(username);
  }

  const newUser = new userModel({
    username,
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  await newUser.save();
  const { token, new_session } = await create_session(newUser, ip, userAgent);
  if (!new_session) {
    return new Error("Error al crear la sesion");
  }

  return { token, user: newUser };
};

const logout = async (token: string) => {
  const r = await sessionsModel.updateOne(
    { token },
    { status: false, updatedAt: new Date() }
  );
  if (!r) {
    return new Error("Error al cerrar la sesion");
  }

  return r;
};

export { logout, login, register, create_session as active_session };
