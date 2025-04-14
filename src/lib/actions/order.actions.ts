"use server"

import { CreateOrderParams } from "@/types/order.type";
import { connectToDatabase } from "../mongoose";
import OrderModel from "@/app/database/order.model";

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
    const orders = await OrderModel.find().populate("course").populate("user").sort({ created_at: -1 });
    
    return JSON.parse(JSON.stringify(orders));
  }
  catch (error) {
    console.error("Error creating order:", error);
    throw error; 
  }
}