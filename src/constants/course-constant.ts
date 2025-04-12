import { BadgeStatusVariant } from "@/types/common";
import { CourseLevel, CourseStatus } from "./enums";

export const courseStatus: {
  title: string;
  value: CourseStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: "Đã duyệt",
    value: CourseStatus.APPROVED,
    className: "text-green-500 bg-green-500/10",
    variant: "success",
  },
  {
    title: "Chờ duyệt",
    value: CourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500/10",
    variant: "warning",
  },
  {
    title: "Từ chối",
    value: CourseStatus.REJECTED,
    className: "text-red-500 bg-red-500/10",
    variant: "danger",
  },
  {
    title: "Tất cả",
    value: CourseStatus.ALL,
    className: "text-yellow-500 bg-yellow-500/10",
    variant: "success",
  },
];
export const courseLevel: {
  title: string;
  value: CourseLevel;
}[] = [
  {
    title: "Dễ",
    value: CourseLevel.BEGINNER,
  },
  {
    title: "Trung bình",
    value: CourseLevel.INTERMEDIATE,
  },
  {
    title: "Khó",
    value: CourseLevel.ADVANCED,
  },
];

export const courseLevelTitle: Record<CourseLevel, string> = {
  [CourseLevel.BEGINNER]: "Dễ",
  [CourseLevel.INTERMEDIATE]: "Trung bình",
  [CourseLevel.ADVANCED]: "Khó",
};

export const commonClassName = {
  status:
    "bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs whitespace-nowrap",
  action:
    "size-8 rounded-md border flex items-center justify-center p-2 text-gray-500 hover:border-opacity-50 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20",
  paginationButton:
    "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary",
};
