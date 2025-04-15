import { Document, Schema } from 'mongoose';

import { CourseLevel, CourseStatus } from '@/constants/enums';

export interface CourseModelProps extends Document {
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
