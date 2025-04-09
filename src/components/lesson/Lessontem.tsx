import { TUpdateCourseLecture } from "@/types";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui";
import { IconPlay } from "../icons";
import Link from "next/link";

const Lessontem = ({
  lectures,
  slug,
}: {
  lectures: TUpdateCourseLecture[];
  slug: string;
}) => {
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
              <Link href={"#"} className={`${lesson.slug === slug ? 'text-primary' : ''}`} key={lesson._id}>
                <AccordionContent className="flex items-center gap-2">
                  <IconPlay className="size-5" />
                  <span className="text-medium">{lesson.title}</span>
                  <div className="ml-auto text-xs font-semibold flex-shrink-0">{lesson.duration}</div>
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
