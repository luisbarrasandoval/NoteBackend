import { Request } from 'express';

import { Types } from 'mongoose';

export type userID = Types.ObjectId;

interface RequestWithUser extends Request {
  user?: userID;
}

export default RequestWithUser;
