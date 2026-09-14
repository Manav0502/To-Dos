import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, 'Todo text is required'],
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Todo', todoSchema);