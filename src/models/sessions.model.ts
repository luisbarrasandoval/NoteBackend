import { model, Schema } from 'mongoose';
import ISession from '../interfaces/sessions.interface';

const sessionScheme = new Schema<ISession>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userAgent: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  status: {
    type: Boolean,
    default: true
  },

  token: {
    type: String,
    required: true
  }
});

sessionScheme.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.password;
    delete ret.token;
    delete ret.user;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default model<ISession>('Session', sessionScheme);
