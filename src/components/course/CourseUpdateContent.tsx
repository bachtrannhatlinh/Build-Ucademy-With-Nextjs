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
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/types";
import { cn } from "@/lib/utils";
import { createLession } from "@/lib/actions/lession.actions";
import { ILesson } from "@/app/database/lesson.model";
import { updateLesson } from "@/lib/actions/lession.actions";
import slugify from "slugify";
import LessonItemUpdate from "../lesson/LessonItemUpdate";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const lectures = course.lectures || [];
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonEdit, setlessonEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");

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
  };

  const handleAddNewLession = async (courseId: string, lectureId: string) => {
    try {
      const res = await createLession({
        path: `/manage/course/update-content/?slug=${course.slug}`,
        course: courseId,
        lecture: lectureId,
        title: "Bài giảng mới 1",
        slug: `bai-giang-moi-1-${new Date().getTime().toString().slice(-3)}`,
      });
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Error creating lecture:", error);
      toast.error("Có lỗi xảy ra khi tạo bài giảng mới");
    }
  };

  const handleUpdateLesson = async (
    e: React.MouseEvent<HTMLSpanElement>,
    lessonId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[*+-.~.()'"!:@]/g,
          }),
        },
        path: `/manage/course/update-content/?slug=${course.slug}`,
      })
      if (res?.success) {
        toast.success("Update khoá học thành công");
        setlessonEdit("");
        setLessonIdEdit("");
      }
    } catch (error) {
      console.error("Error updating lecture:", error);
      toast.error("Có lỗi xảy ra khi cập nhật bài giảng");
    }
  }

  const handleDeleteLession = async (
    e: React.MouseEvent<HTMLSpanElement>,
    lessonId: string
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
        await updateLesson({
          lessonId,
          updateData: {
            _destroy: true,
          },
          path: `/manage/course/update-content/?slug=${course.slug}`,
        });
        toast.success("Xóa khóa học thành công");
      }
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: TUpdateCourseLecture) => (
          <div key={lecture._id}>
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
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={cn(
                              commonClassName.action,
                              "text-green-500"
                            )}
                            onClick={(e) => {
                              handleUpdateLecture(e, lecture._id);
                            }}
                          >
                            <IconCheck />
                          </span>
                          <span
                            className={cn(
                              commonClassName.action,
                              "text-red-500"
                            )}
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
                            className={cn(
                              commonClassName.action,
                              "text-green-500"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit(lecture._id);
                            }}
                          >
                            <IconEdit />
                          </span>
                          <span
                            className={cn(
                              commonClassName.action,
                              "text-red-500"
                            )}
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
                  {lecture.lessons?.map((lesson: ILesson) => (
                    <Accordion type="single" key={lesson._id} collapsible>
                      <AccordionItem value={lesson._id}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-3 justify-between w-full pr-5">
                            {lesson._id === lessonIdEdit ? (
                              <>
                                <div className="w-full">
                                  <Input
                                    placeholder="Tên chương"
                                    defaultValue={lesson.title}
                                    onChange={(e) => {
                                      setlessonEdit(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <span
                                    className={cn(
                                      commonClassName.action,
                                      "text-green-500"
                                    )}
                                    onClick={(e) => {
                                      handleUpdateLesson(e, course._id);
                                    }}
                                  >
                                    <IconCheck />
                                  </span>
                                  <span
                                    className={cn(
                                      commonClassName.action,
                                      "text-red-500"
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLessonIdEdit("");
                                    }}
                                  >
                                    <IconClose />
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-full">
                                  <div>{lesson.title}</div>
                                </div>
                                <div className="flex gap-2">
                                  <span
                                    className={cn(
                                      commonClassName.action,
                                      "text-green-500"
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLessonIdEdit(lesson._id);
                                    }}
                                  >
                                    <IconEdit />
                                  </span>
                                  <span
                                    className={cn(
                                      commonClassName.action,
                                      "text-red-500"
                                    )}
                                    onClick={(e) => {
                                      handleDeleteLession(e, lesson._id);
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
                          <LessonItemUpdate 
                            lesson={lesson}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              onClick={() => handleAddNewLession(course._id, lecture._id)}
              className="mt-5 ml-auto w-fit block"
            >
              Thêm chương mới
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
