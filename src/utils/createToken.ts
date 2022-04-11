import jwt from 'jsonwebtoken';
import IUser from '../interfaces/user.interface';

interface DataStoredInToken {
  _id: string;
  username: string;
}

const createToken = (user: IUser) => {
  const secret = process.env.JWT_SECRET;
  const payload: DataStoredInToken = {
    _id: user._id,
    username: user.username,
  };
  return jwt.sign(payload, secret as string, { expiresIn: '1h' });
};

export { DataStoredInToken }
export default createToken;
