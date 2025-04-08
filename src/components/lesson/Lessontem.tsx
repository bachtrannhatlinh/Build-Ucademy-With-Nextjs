import { TUpdateCourseLecture } from "@/types";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui";
import { IconPlay } from "../icons";

const Lessontem = ({ lectures }: { lectures: TUpdateCourseLecture[] }) => {
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
              <AccordionContent
                key={lesson._id}
                className="flex items-center gap-2"
              >
                <IconPlay className="size-5" />
                <span className="text-medium">{lesson.title}</span>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Lessontem;
