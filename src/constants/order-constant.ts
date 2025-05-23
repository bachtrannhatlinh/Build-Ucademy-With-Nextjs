import { BadgeStatusVariant } from '@/types/common';
import { OrderStatus } from './enums';

export const orderStatus: {
  title: string;
  value: OrderStatus;
  variant: BadgeStatusVariant;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: OrderStatus.COMPLETED,
    className: 'text-green-500 bg-green-500/10',
    variant: 'success',
  },
  {
    title: 'Chờ duyệt',
    value: OrderStatus.PENDING,
    className: 'text-orange-500 bg-orange-500/10',
    variant: 'warning',
  },
  {
    title: 'Đã hủy',
    value: OrderStatus.CANCELED,
    className: 'text-red-500 bg-red-500/10',
    variant: 'danger',
  },
];
