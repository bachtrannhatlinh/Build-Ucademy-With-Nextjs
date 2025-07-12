"use server";

import Coupon, { ICoupon } from "@/app/database/coupon.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import courseModel from "@/app/database/course.model";
import { TCreateCouponParams, TUpdateCouponParams } from "@/types";

export async function createCoupon(params: TCreateCouponParams) {
  try {
    connectToDatabase();
    const newCoupon = await Coupon.create(params);
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}

export async function updateCoupon(params: TUpdateCouponParams) {
  try {
    connectToDatabase();
    const couponUpdate = await Coupon.findByIdAndUpdate(params._id, params, {
      new: true,
    });
    return JSON.parse(JSON.stringify(couponUpdate));
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
    const coupon = await Coupon.findOne({ code }).populate({
      path: "courses",
      model: courseModel,
      select: "_id title",
    });
    return JSON.parse(JSON.stringify(coupon));
  }
  catch (error) {
    console.log(error);
  }
}

export async function deleteCoupon(code: string) {
  try {
    connectToDatabase();
    await Coupon.findOneAndDelete({ code });
    revalidatePath("/manage/coupon");
  } catch (error) {
    console.log(error);
  }
}

export async function getValidateCoupon(
  params: any
): Promise<ICoupon | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));
    let isActive = true;
    if (!coupon?.active) isActive = false;
    if (coupon?.used >= coupon?.limit) isActive = false;
    if (coupon?.start_date && new Date(coupon?.start_date) > new Date())
      isActive = false;
    if (coupon?.end_date && new Date(coupon?.end_date) < new Date())
      isActive = false;
    return isActive ? coupon : undefined;
  } catch (error) {
    console.log(error);
  }
}