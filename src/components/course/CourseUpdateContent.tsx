"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassName } from "@/constants";
import { IconCheck, IconClose, IconDelete, IconEdit } from "../icons";
import { Button, Input } from "../ui";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { TCourseUpdateParams } from "@/types";
import { ILecture } from "@/app/database/lecture.model";
import { cn } from "@/lib/utils";

const CourseUpdateContent = ({
  course,
}: {
  course: TCourseUpdateParams;
}) => {
  const lectures = course.lectures || [];
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");

  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        course: course._id,
        title: "Chương mới 1",
        order: lectures.length + 1,
        path: `/manage/course/update-content/?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Error creating lecture:", error);
      toast.error("Có lỗi xảy ra khi tạo bài giảng mới");
    }
  };

  const handleDeleteLecture = async (
    e: React.MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
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
        await updateLecture({
          lectureId: lectureId,
          updateData: {
            _destroy: true,
            path: `/manage/course/update-content/?slug=${course.slug}`,
          },
        });
        toast.success("Xóa khóa học thành công");
      }
    });
  };

  const handleUpdateLecture = async (
    e: React.MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content/?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Update khoá học thành công");
        setLectureIdEdit("");
        setLectureEdit("");
      }
    } catch (error) {
      console.error("Error updating lecture:", error);
      toast.error("Có lỗi xảy ra khi cập nhật bài giảng");
    }
  }


  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.length > 0 &&
          lectures.map((lecture: ILecture) => (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              key={lecture._id}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-3 justify-between w-full pr-5">
                    {lecture._id === lectureIdEdit ? (
                      <>
                        <div className="w-full">
                          <Input
                            placeholder="Tên chương"
                            defaultValue={lecture.title}
                            onChange={(e) => {
                              setLectureEdit(e.target.value);
                            }
}
                          />
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={cn(commonClassName.action, "text-green-500")}
                            onClick={(e) => {
                              handleUpdateLecture(e, lecture._id);
                            }}
                          >
                            <IconCheck />
                          </span>
                          <span
                            className={cn(commonClassName.action, "text-red-500")}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit("");
                            }}
                          >
                            <IconClose />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full">
                          <div>{lecture.title}</div>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={cn(commonClassName.action, "text-green-500")}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit(lecture._id);
                            }}
                          >
                            <IconEdit />
                          </span>
                          <span
                            className={cn(commonClassName.action, "text-red-500")}
                            onClick={(e) => {
                              handleDeleteLecture(e, lecture._id);
                            }}
                          >
                            <IconDelete />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
