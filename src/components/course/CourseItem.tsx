import Image from "next/image";
import Link from "next/link";
import React from "react";
import {IconEye, IconStar, IconClock} from "@/components/icons";

const CourseItem = () => {
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
      <Link href="#" className="block h-[180px] relative">
        <div className="relative w-full h-full">
          <Image
            src="https://cdn.pixabay.com/photo/2019/10/11/00/08/sunset-4540772_1280.jpg"
            alt=""
            fill
            className="object-cover rounded"
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
          Khoá học NextJS Pro - Xây dựng E-learning system hoàn chỉnh
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500">
          {courseInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-1 dark:text-gray-300">
              {item.icon("size-4")}
              <span>{item.title}</span>
            </div>
          ))}
          <span className="font-semibold text-red-400 ml-auto text-base">
            800.000
          </span>
        </div>
        <Link
          href="#"
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
