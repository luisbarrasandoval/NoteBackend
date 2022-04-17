import jwt from 'jsonwebtoken';
import IUser from '../interfaces/user.interface';

import authConfig from '../config/auth.config';

interface DataStoredInToken {
  _id: string;
  username: string;
}

const createToken = (user: IUser, expire: number | undefined = undefined) => {
  const secret = process.env.JWT_SECRET;
  const payload: DataStoredInToken = {
    _id: user._id,
    username: user.username,
  };

  const x = expire || authConfig.expiresIn;

  const token = jwt.sign(payload, secret as string, {
    expiresIn: x,
  });

  return {token, expiresIn: Date.now() + x * 60 * 1000};
};

export {DataStoredInToken};
export default createToken;
