"use server";

import Coupon, { ICoupon } from "@/app/database/coupon.model";
import { connectToDatabase } from "../mongoose";

export async function createCoupon(params: any) {
  try {
    connectToDatabase();
    const newCoupon = await Coupon.create(params);
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}

export async function updateCoupon(id: string, params: any) {
  try {
    connectToDatabase();
    const couponUpdat = await Coupon.findByIdAndUpdate(id, params, {
      new: true,
    });
    return JSON.parse(JSON.stringify(couponUpdat));
  }
  catch (error) {
    console.log(error);
  }
}

export async function getCoupons(params: any): Promise<ICoupon[] | undefined> {
  try {
    connectToDatabase();
    const coupons = await Coupon.find(params);
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}

export async function getCouponByCode(code: string): Promise<ICoupon | undefined> {
  try {
    connectToDatabase();
    const coupon = await Coupon.findOne({ code });
    return JSON.parse(JSON.stringify(coupon));
  }
  catch (error) {
    console.log(error);
  }
}
