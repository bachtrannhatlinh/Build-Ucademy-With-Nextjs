import { CourseLevel, CourseStatus } from "@/constants/enums";
import { Document, model, models, Schema } from "mongoose";

export interface ICourse extends Document {
  _id: string;
  title: string;
  image: string;
  intro_url: string;
  description: string;
  price: number;
  sale_price: number;
  slug: string;
  status: CourseStatus;
  created_at: Date;
  author: Schema.Types.ObjectId;
  level: CourseLevel;
  views: number;
  rating: number[];
  info: {
    requirements: string[];
    benefits: string[];
    qa: {
      question: string;
      answer: string;
    }[];
  };
  lectures: Schema.Types.ObjectId[];
  _destroy: boolean;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  image: { type: String },
  intro_url: { type: String, default: "" },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  sale_price: { type: Number, required: true, default: 0 },
  slug: { type: String },
  status: {
    type: String,
    enum: Object.values(CourseStatus),
    default: CourseStatus.PENDING,
  },
  created_at: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
  rating: { type: [Number], default: [5] },
  views: { type: Number, default: 0 },
  info: {
    requirements: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    qa: {
      type: [
        {
          question: { type: String },
          answer: { type: String },
        },
      ],
    },
  },
  _destroy: { type: Boolean, default: false },
  level: {
    type: String,
    enum: Object.values(CourseLevel),
    default: CourseLevel.BEGINNER,
  },
});

const courseModel = models?.Course || model("Course", courseSchema);
export default courseModel;
