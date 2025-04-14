export interface CreateOrderParams {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
}
