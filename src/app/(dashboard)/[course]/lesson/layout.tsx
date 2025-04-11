import React, { Suspense } from "react";
import LoadingPlayer from "./@player/LoadingPlayer";
import LessonWrapper from "./LessonWrapper";

const layout = async ({
  player,
  outline,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
}) => {
  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense>{outline}</Suspense>
    </LessonWrapper>
  );
};

export default layout;
