"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconEye, IconStar, IconClock } from "@/components/icons";
import { ICourse } from "@/app/database/course.model";

const CourseItem = ({ course }: { course: ICourse }) => {
  const courseInfo = [
    {
      title: "3000",
      icon: (className?: string) => <IconEye className={className} />,
    },
    {
      title: "5.0",
      icon: (className?: string) => <IconStar className={className} />,
    },
    {
      title: "30h25p",
      icon: (className?: string) => <IconClock className={className} />,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/course/${course.slug}`} className="block h-[180px] relative">
        <div className="relative w-full h-full">
          <Image
            src={course.image || "https://utfs.io/f/c97a7c94-663f-4cf9-b027-7030446b96e7-16.jpg"}
            alt={course.title || "Course thumbnail"}
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg"
            sizes="@media (max-width: 768px) 100vw,"
            priority
          />
        </div>
        <span
          className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10
      text-white font-medium bg-green-500 text-xs"
        >
          New
        </span>
      </Link>

      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3">
          {course.title}
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500">
          {courseInfo.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 dark:text-gray-300"
            >
              {item.icon("size-4")}
              <span>{item.title}</span>
            </div>
          ))}
          <span className="font-semibold text-red-400 ml-auto text-base">
            {course.price.toString()}đ
          </span>
        </div>
        <Link
          href={`/course/${course.slug}`}
          className="flex items-center justify-center w-full mt-10 rounded-lg
         text-white font-semibold bg-red-400 h-12"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
