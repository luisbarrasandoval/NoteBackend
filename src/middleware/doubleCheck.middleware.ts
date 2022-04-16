import { Request, Response, NextFunction } from "express";
import authenticationMiddleWare from "./authentication.middleware";

const doubleCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authenticationMiddleWare(req, res, next, true);
};

export default doubleCheckMiddleware;