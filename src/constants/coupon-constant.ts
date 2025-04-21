import { z } from 'zod';
import { CouponType } from './enums';

export const couponTypes: {
  title: string;
  value: CouponType;
}[] = [
  {
    title: 'Phần trăm',
    value: CouponType.PERCENT,
  },
  {
    title: 'Giá trị',
    value: CouponType.AMOUNT,
  },
];
export const couponStatuses = [
  {
    title: 'Đang kích hoạt',
    value: 1,
  },
  {
    title: 'Chưa kích hoạt',
    value: 0,
  },
];

export const couponFormSchema = z.object({
  title: z
    .string({
      message: "Tiêu đề không được để trống",
    })
    .min(10, "Tiêu đề phải có ít nhất 10 ký tự"),
  code: z
    .string({
      message: "Mã giảm giá không được để trống",
    })
    .min(3, "Mã giảm giá phải có ít nhất 3 ký tự")
    .max(10, "Mã giảm giá không được quá 10 ký tự"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  active: z.boolean().optional(),
  value: z.number().optional(),
  type: z.enum([CouponType.AMOUNT, CouponType.PERCENT]),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});