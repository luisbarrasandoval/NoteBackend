import { Request } from 'express';

import { Types } from 'mongoose';

interface RequestWithUser extends Request {
  user?: Types.ObjectId;
}

export default RequestWithUser;
