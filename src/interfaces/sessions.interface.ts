import { Types } from 'mongoose';

interface ISession {
  _id: string;
  // ref mongoose
  user: Types.ObjectId,
  userAgent: string;
  ip: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  token: string;
}

export default ISession;
