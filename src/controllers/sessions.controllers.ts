import { Request, Response, NextFunction } from "express";
import RequestWithUser from "../interfaces/RequestWithUser";
import sessionsModel from "../models/sessions.model";

const info = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const r = await sessionsModel.find({ user: req.user, active: true });
  // vertify expired
  
  res.json(r);
};

export { info };
