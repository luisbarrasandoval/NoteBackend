import { Request } from 'express';

import { Types } from 'mongoose';
import IUser from './user.interface';

export type userID = Types.ObjectId;

interface RequestWithUser extends Request {
  user?: userID;
}

export default RequestWithUser;
