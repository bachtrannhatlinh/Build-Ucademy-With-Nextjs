"use server"

import { CreateOrderParams } from "@/types/order.type";
import { connectToDatabase } from "../mongoose";
import OrderModel from "@/app/database/order.model";
import { OrderStatus } from "@/constants";
import { revalidatePath } from "next/cache";
import CourseModel from "@/app/database/course.model";
import UserModel from "@/app/database/user.model";

export async function createOrder(params: CreateOrderParams) {
  try {
    await connectToDatabase();
    const newOrder = await OrderModel.create(params);
    
    // Return the created order
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; 
  }
}

export async function getAllOrder() {
  try {
    await connectToDatabase();

    const orders = await OrderModel.find()
      .populate("course")
      .populate("user")
      .sort({ created_at: -1 });

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Error getting order:", error);
    throw error; 
  }
}

// export async function ApproveOrCancalOrder(status: string, id: string) {
//   try {
//     await connectToDatabase();
//     const order = await OrderModel.findById(id);
//     if (!order) {
//       throw new Error("Order not found");
//     }
//     if(status === OrderStatus.PENDING) {
//       order.status = OrderStatus.COMPLETED;
//     }
//     else if(status === OrderStatus.COMPLETED) {
//       order.status = OrderStatus.PENDING;
//     }

//     await order.save();
    
//     revalidatePath("/manage/order");
//     return JSON.parse(JSON.stringify(order));
//   } catch (error) {
//     console.error("Error creating order:", error);
//     throw error; 
//   }
// }

// export async function getOrderByStatusApproved() {
//   const statusComplete = OrderStatus.COMPLETED
//   try {
//     await connectToDatabase();
//     const order = await OrderModel.find()
//       .populate("course")
//       .populate("user");

//     const orderApproved = order.filter((item) => item.status === statusComplete);

//     return JSON.parse(JSON.stringify(orderApproved));
//   } catch (error) {
//     console.error("Error getting order:", error);
//     throw error; 
//   }
// }

export async function ApproveOrCancalOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  try {
    connectToDatabase();
    const findOrder = await OrderModel.findById(orderId)
      .populate({
        path: "course",
        model: CourseModel,
        select: "_id",
      })
      .populate({
        path: "user",
        model: UserModel,
        select: "_id",
      });
    if (!findOrder) return;
    if (findOrder.status === OrderStatus.CANCELED) return;
    const findUser = await UserModel.findById(findOrder.user._id);

    await OrderModel.findByIdAndUpdate(orderId, {
      status,
    });
    if (
      status === OrderStatus.COMPLETED &&
      findOrder.status === OrderStatus.PENDING
    ) {
      findUser.courses.push(findOrder.course._id);
      await findUser.save();
    }
    if (
      status === OrderStatus.CANCELED &&
      findOrder.status === OrderStatus.COMPLETED
    ) {
      findUser.courses = findUser.courses.filter(
        (el: any) => el.toString() !== findOrder.course._id.toString()
      );
      await findUser.save();
    }
    revalidatePath("/manage/order");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getOrderDetails({ code }: { code: string }) {
  try {
    connectToDatabase();
    const order = await OrderModel.findOne({
      code,
    }).populate({
      path: "course",
      select: "title",
    });
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
  }
}