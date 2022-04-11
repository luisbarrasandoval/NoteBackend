import mongoose from 'mongoose';
import IUser from '../interfaces/user.interface';

const userScheme = new mongoose.Schema<IUser>({
  create_at: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});


userScheme.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.password;
    delete ret.create_at;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const userModel = mongoose.model<IUser>('User', userScheme);
export default userModel;
export { userScheme }
