import { model, models, Schema } from "mongoose";

export interface IHistory extends Document {
  _id: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  created_at: Date;
}

const historySchema = new Schema<IHistory>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  lesson: { type: Schema.Types.ObjectId, ref: "Lecture" },
  created_at: { type: Date, default: Date.now },
});


const HistoryModel = models.History || model<IHistory>("History", historySchema);
export default HistoryModel;
