import { NextFunction, Request, Response } from "express";
import * as AuthenticationService from "../services/authentication.service";
import IUser from "../interfaces/user.interface";

const send_session = (res: Response, token: string, user: IUser) => {
  res.setHeader("Authorization", "Bearer " + token);
  res.send(user);
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const result = await AuthenticationService.login(
    email,
    password,
    req.ip,
    req.headers["user-agent"] || "NO_USER_AGENT"
  );

  if (result instanceof Error) {
    return next(result);
  }

  const { token, user } = result;

  send_session(res, token, user);
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];
  if (token === undefined) {
    return next(new Error("No token provided"));
  }

  token = token.split(" ")[1];
  const result = await AuthenticationService.logout(token);
  if (result instanceof Error) {
    return next(result);
  }

  res.sendStatus(201);
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, firstName, lastName, email, password } = req.body;

  const result = await AuthenticationService.register(
    {
      username,
      firstName,
      lastName,
      email,
      password,
    },
    req.ip,
    req.headers["user-agent"] || "NO_USER_AGENT"
  );

  if (result instanceof Error) {
    return next(result);
  }

  const { token, user } = result;
  send_session(res, token, user);
};

export { login, register, logout };
