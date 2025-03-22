"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../typography/Heading";
import { cn } from "@/lib/utils";
import { commonClassName, CourseStatus, courseStatus } from "@/constants";
import { IconDelete, IconEdit, IconEye, IconLeftArrow, IconPlus, IconRightArrow, IconStudy } from "../icons";
import Link from "next/link";
import { ICourse } from "@/app/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { Input } from "../ui";

export interface CourseManageProps {
  courses: ICourse[];
}

export const CourseManage = ({ courses }: CourseManageProps) => {
  const handleDeleteCourse = async (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: CourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Xóa khóa học thành công");
      }
    });
  };

  const handleChangeStatus = async (slug: string, status: CourseStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status:
              status === CourseStatus.PENDING
                ? CourseStatus.APPROVED
                : CourseStatus.PENDING,
            _destroy: false,
          },
          path: "/manage/course",
        });
        toast.success("Cập nhật trạng thái thành công");
      }
    });
  };

  return (
    <>
      <Link 
        href="/manage/course/new"
      className="size-16 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-10 animate-bounce">
        <IconPlus />
      </Link>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý khóa học</Heading>
        <div className="w-full lg:w-[300px]">
          <Input placeholder="Tìm kiếm khoá học..." />
        </div>
      </div>

      <Table className="table-responsive ">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng Thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course: ICourse) => {
            const courseStatusItem = courseStatus.find(
              (status) => status.value === course.status
            );
            return (
              <TableRow key={course._id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={course.image}
                      alt="Course Image"
                      width={80}
                      height={80}
                      className="flex-shrink-0 size-16 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-sm lg:text-base whitespace-nowrap">{course.title}</h3>
                      <h4 className="text-sm lg:text-sm text-slate-500">
                        {new Date(course.created_at).toLocaleDateString(
                          "vi-VI"
                        )}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-sm lg:text-base">{course.price.toLocaleString()}đ</span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className={cn(
                      commonClassName.status,
                      courseStatusItem?.className
                    )}
                    onClick={() =>
                      handleChangeStatus(course.slug, course.status)
                    }
                  >
                    {courseStatusItem?.title}
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Link
                      href={`/manage/course/update-content?slug=${course.slug}`}
                      className={cn(commonClassName.action)}
                    >
                      <IconStudy />
                    </Link>
                    <Link
                      href={`/course/${course.slug}`}
                      target="_blank"
                      className={cn(commonClassName.action)}
                    >
                      <IconEye />
                    </Link>
                    <Link
                      href={`/manage/course/update?slug=${course.slug}`}
                      target="_blank"
                      className={cn(commonClassName.action)}
                    >
                      <IconEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteCourse(course.slug)}
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

      <div className="flex justify-end gap-3 mt-5">
        <button className={cn(commonClassName.paginationButton)}>
          <IconLeftArrow />
        </button>
        <button className={cn(commonClassName.paginationButton)}>
          <IconRightArrow />
        </button>
      </div>
    </>
  );
};
