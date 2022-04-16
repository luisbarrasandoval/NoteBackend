import { Types } from 'mongoose';
import IUser from './user.interface';

interface ISession {
  _id: string;
  user: Types.ObjectId,
  userAgent: string;
  ip: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  token: string;
  doubleCheck: Date;
  expiresIn: number;
}

export default ISession;
