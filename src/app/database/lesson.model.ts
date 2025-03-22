import { LessonType } from '@/constants/enums';
import { Document, model, models, Schema } from 'mongoose';

export interface ILesson extends Document {
  _id: string;
  title: string;
  slug: string;
  type: LessonType;
  course: Schema.Types.ObjectId;
  lecture: Schema.Types.ObjectId;
  created_at: Date;
  _destroy: boolean;
  order: number;
  duration: number;
  video_url: string;
  content: string;
}

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  lecture: { type: Schema.Types.ObjectId, ref: 'Lecture' },
  created_at: { type: Date, default: Date.now },
  _destroy: { type: Boolean, default: false },
  slug: { type: String, required: true },
  order: { type: Number, default: 0 },
  content: { type: String },
  video_url: { type: String },
  duration: { type: Number, default: 0 },
  type: { type: String, enum: Object.values(LessonType), default: LessonType.VIDEO },
});

const lessonModel = models.Lesson || model("Lesson", lessonSchema);
export default lessonModel;