"use client";

import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { commonClassName } from "@/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


const LessonNavigation = ({prevLessonIndex, nextLessonIndex}: {prevLessonIndex: string; nextLessonIndex: string;}) => {
    const router = useRouter();
    
    return (
    <div className="flex justify-start gap-3 mt-5">
      <button
        className={cn(commonClassName.paginationButton)}
        onClick={() => {!prevLessonIndex ? null : router.push(prevLessonIndex)}}
        disabled={!prevLessonIndex}
      >
        <IconLeftArrow />
      </button>
      <button
        className={cn(commonClassName.paginationButton)}
        onClick={() => {!nextLessonIndex ? null : router.push(nextLessonIndex)}}
        disabled={!nextLessonIndex}
      >
        <IconRightArrow />
      </button>
    </div>
  );
};

export default LessonNavigation;
