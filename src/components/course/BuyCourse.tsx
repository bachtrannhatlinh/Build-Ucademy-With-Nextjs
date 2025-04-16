import { TCourseUpdateParams } from "@/types";
import React from "react";
import { IconPlay } from "../icons";
import { Button } from "../ui";
import Link from "next/link";

const BuyCourse = ({
  courseDetails,
  onBuyLesson,
}: {
  courseDetails: TCourseUpdateParams;
  onBuyLesson: () => Promise<void>;
}) => {
  console.log(courseDetails.lectures.length);
  if (courseDetails.lectures.length > 0) {
    return (
      <div className="bgDarkMode borderDarkMode rounded-lg border p-5">
        <Link
          className="flex h-12 w-full items-center justify-center rounded-lg bg-primary font-bold text-white"
          href="/study"
        >
          Khu vực học tập
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="bg-white p-5 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-primary text-xl font-bold">
            {courseDetails.price}
          </strong>
          <span className="text-slate-400 line-through text-sm">
            {courseDetails.sale_price}
          </span>
          <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
            {Math.floor((courseDetails.price / courseDetails.sale_price) * 100)}
          </span>
        </div>
        <h3 className="font-bold mb-3 text-sm">Khoá học gồm có:</h3>
        <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>30h học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <Button className="bg-primary w-full mb-5" onClick={onBuyLesson}>
          Mua khoá học
        </Button>
      </div>
    </>
  );
};

export default BuyCourse;
