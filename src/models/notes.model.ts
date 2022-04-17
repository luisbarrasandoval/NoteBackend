import mongoose from 'mongoose';
import INotes from '../interfaces/notes.interface';

const NotesScheme = new mongoose.Schema<INotes>({
  create_at: Date,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  prioridad: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});

NotesScheme.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.userID;
  },
});

export default mongoose.model<INotes>('Notes', NotesScheme);
