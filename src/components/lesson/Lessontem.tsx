"use client";

import { TUpdateCourseLecture } from "@/types";
import React, { useTransition } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
} from "../ui";
import { IconPlay } from "../icons";
import Link from "next/link";
import { createHistoryClient } from "@/lib/actions/client-history";
import { ILesson } from "@/app/database/lesson.model";
import { IHistory } from "@/app/database/history.model";

const Lessontem = ({
  lectures,
  slug,
  history,
  url
}: {
  lectures: TUpdateCourseLecture[];
  slug: string;
  history?: IHistory[];
  url?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleCheckBox = async (checked: boolean | string, lesson: ILesson) => {
    startTransition(() => {
      createHistoryClient({
        checked: checked,
        course: lesson.course.toString(),
        lesson: lesson._id,
        path: url,
      });
    });
  };

  return (
    <div className="flex flex-col gap-7">
      {lectures.map((lecture: TUpdateCourseLecture) => (
        <Accordion
          type="single"
          collapsible
          key={lecture._id}
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>{lecture.title}</AccordionTrigger>
            {lecture.lessons.map((lesson) => (
              <Link
                href={"#"}
                className={`${lesson.slug === slug ? "text-primary" : ""}`}
                key={lesson._id}
              >
                <AccordionContent className="flex items-center gap-2">
                  <Checkbox
                    checked={history?.some(
                      (el) => el.lesson.toString() === lesson._id.toString()
                    )}
                    onCheckedChange={(checked) =>
                      handleCheckBox(checked, lesson)
                    }
                  />
                  <IconPlay className="size-5" />
                  <span className="text-medium">{lesson.title}</span>
                  <div className="ml-auto text-xs font-semibold flex-shrink-0">
                    {lesson.duration}
                  </div>
                </AccordionContent>
              </Link>
            ))}
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Lessontem;
