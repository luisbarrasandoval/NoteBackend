import { NextFunction, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import AuthenticationExpiredException from '../exceptions/AuthenticationExpiredException';
import HttpException from '../exceptions/HttpException';
import InvalidTokenException from '../exceptions/InvalidTokenException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import RequestWithUser from '../interfaces/RequestWithUser';
import sessionsModel from '../models/sessions.model';
import { DataStoredInToken } from '../utils/createToken';
import validarToken from '../utils/validarToken';

async function authenticationMiddleWare(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

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
      await sessionsModel.findOneAndUpdate({ token }, { status: false });
      return next(new AuthenticationExpiredException());
    } else if (error instanceof JsonWebTokenError) {
      return next(new InvalidTokenException());
    }

    return next(new HttpException(500, 'Error desconocido'));
  }

  if (!valid) {
    return next(new WrongCredentialsException());
  }

  const session = await sessionsModel
    .findOneAndUpdate({ token }, { updatedAt: new Date() });
    // .populate('user');

  if (!session) {
    return next(new WrongCredentialsException());
  }
  if (session.status === false) {
    return next(new WrongCredentialsException());
  }

  // res.setHeader('Authorization', 'Bearer ' + token);
  req.user = session.user;
  next();
}

export default authenticationMiddleWare;
