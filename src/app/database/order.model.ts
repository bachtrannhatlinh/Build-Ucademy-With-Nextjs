import { Document, Schema, models, model } from 'mongoose';
import { OrderStatus } from '@/constants';
import { ICourse } from './course.model';
import { IUser } from './user.model';

export interface OrderModelProps extends Document {
  _id: string;
  code: string;
  course: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: OrderStatus;
  created_at: Date;
  total: number;
  amount: number;
  discount: number;
  coupon?: Schema.Types.ObjectId;
}

export interface PopulatedOrderModelProps extends Omit<OrderModelProps, "course" | "user"> {
  course: ICourse;
  user: IUser;
}

// Define the schema
const orderSchema = new Schema<OrderModelProps>({
  code: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: 'Coupon',
  },
});

const OrderModel = models.Order || model<OrderModelProps>("Order", orderSchema);

export default OrderModel;
