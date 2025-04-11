import React, { Suspense } from "react";
import LoadingPlayer from "./@player/LoadingPlayer";

const layout = async ({
  player,
  outline,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
}) => {
  return (
    <div className="block lg:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense>{outline}</Suspense>
    </div>
  );
};

export default layout;
