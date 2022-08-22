import mongoose, { Schema } from "mongoose";

interface Task {
  task: string;
  isComplete: boolean;
}

const taskSchema = new Schema<Task>({
  task: {
    type: String,
    default: null,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<Task>("task", taskSchema);
