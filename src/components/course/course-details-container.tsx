"use client";

import { IconPlay } from "@/components/icons";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { ICourse } from "@/app/database/course.model";
import PageNotFound from "@/app/not-found";
import { useRouter } from "next/navigation";
import { courseLevelTitle, CourseStatus } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function BoxInfo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-5">
      <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export interface CourseDetailsContainerProps {
  userId?: string | null;
  courseDetails: ICourse | undefined;
}

function CourseDetailsContainer({
  courseDetails,
}: CourseDetailsContainerProps) {
  const router = useRouter();
  const isEmptyData =
    !courseDetails || courseDetails.status !== CourseStatus.APPROVED;

  if (isEmptyData) return <PageNotFound />;

  const videoId = courseDetails.intro_url?.split("v=")[1];

  const detailCourseSlug = (slug: string) => {
    return router.push(`/course/${slug}`);
  };

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {!courseDetails.image ? (
            <>
              <iframe
                width="895"
                height="503"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Phao - 2 Phut Hon (KAIZ Remix) | TikTok Vietnamese Music 2020"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full b-full object-fill"
              ></iframe>
            </>
          ) : (
            <Image
              src={courseDetails.image}
              alt=""
              fill
              className="w-full h-full object-cover rounded-lg"
              onClick={() => detailCourseSlug(courseDetails.slug)}
            />
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">{courseDetails.title}</h1>

        <BoxSection title="Mô tả">
          <div className="loading-normal mb-10">
            {courseDetails.description}
          </div>
        </BoxSection>

        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5 mb-10">
            <BoxInfo title="Bài học">{courseDetails.title}</BoxInfo>
            <BoxInfo title="Lượt xem">
              {new Intl.NumberFormat("en-US").format(courseDetails.views)}
            </BoxInfo>
            <BoxInfo title="Trình độ">
              {courseLevelTitle[courseDetails.level]}
            </BoxInfo>
            <BoxInfo title="Thời gian">100h45ph</BoxInfo>
          </div>
        </BoxSection>

        <BoxSection title="Yêu cầu">
          <div className="loading-normal mb-10">
            {courseDetails.info.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-primary">-</span>
                <span>{requirement}</span>
              </div>
            ))}
          </div>
        </BoxSection>

        <BoxSection title="Lợi ích">
          <div className="loading-normal mb-10">
            {courseDetails.info.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-primary">-</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </BoxSection>

        <BoxSection title="Q.A">
          <div className="loading-normal mb-10">
            {courseDetails.info.qa.map((item, index) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </BoxSection>
      </div>
      <div>
        <div className="bg-white p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <strong className="text-primary text-xl font-bold">
              {courseDetails.price}
            </strong>
            <span className="text-slate-400 line-through text-sm">
              {courseDetails.sale_price}
            </span>
            <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
              {Math.floor(
                (courseDetails.price / courseDetails.sale_price) * 100
              )}
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
          <Button className="bg-primary w-full mb-5">Mua khoá học</Button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsContainer;
