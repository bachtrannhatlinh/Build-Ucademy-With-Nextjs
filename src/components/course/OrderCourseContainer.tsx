"use client";

import React, { useCallback } from "react";

import { PopulatedOrderModelProps } from "@/app/database/order.model";
import Heading from "../typography/Heading";
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { commonClassName, OrderStatus, orderStatus } from "@/constants";
import { cn } from "@/lib/utils";
import { IconCheck, IconDelete } from "../icons";
import { ApproveOrCancalOrder } from "@/lib/actions/order.actions";

const OrderCourseContainer = ({
  listOrder,
}: {
  listOrder: PopulatedOrderModelProps[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearchSource = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      router.push(`${pathname}?${createQueryString("search", value)}`);
    },
    1000
  );

  const handleSelectStatus = (status: OrderStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý đơn hàng</Heading>
        <div className="flex">
          <div className="w-full lg:w-[300px] mr-5">
            <Input
              placeholder="Tìm kiếm khoá học..."
              onChange={(e) => handleSearchSource(e)}
            />
          </div>

          <Select
            onValueChange={(value) => handleSelectStatus(value as OrderStatus)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {orderStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table className="table-responsive ">
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khoá học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOrder.map((order: PopulatedOrderModelProps) => {
            const listStatusItem = orderStatus.find(
              (status) => status.value === order.status
            );
            return (
              <TableRow key={order._id}>
                <TableCell>
                  <span className="font-bold text-sm lg:text-base">
                    {order.code}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-sans text-sm lg:text-base">
                    {order.course.title}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-sans text-sm lg:text-base">
                    {order.user.username}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-sans text-sm lg:text-base">
                    {order.total.toLocaleString()}đ
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-sans text-sm lg:text-base"></span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      commonClassName.status,
                      listStatusItem?.className
                    )}
                  >
                    {listStatusItem?.title}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        ApproveOrCancalOrder({ orderId: order._id, status: OrderStatus.COMPLETED })
                      }
                      className={cn(commonClassName.action)}
                    >
                      <IconCheck />
                    </button>

                    <button
                      onClick={() =>
                        ApproveOrCancalOrder({ orderId: order._id, status: OrderStatus.CANCELED })
                      }
                      className={cn(commonClassName.action)}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* <div className="flex justify-end gap-3 mt-5">
        <button
          className={cn(commonClassName.paginationButton)}
          onClick={() => handleChangePage("prev")}
        >
          <IconLeftArrow />
        </button>
        <button
          className={cn(commonClassName.paginationButton)}
          onClick={() => handleChangePage("next")}
        >
          <IconRightArrow />
        </button>
      </div> */}
    </>
  );
};

export default OrderCourseContainer;
