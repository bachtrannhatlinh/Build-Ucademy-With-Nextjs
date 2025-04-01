"use client";

import React, { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import UserRegistration from "@/components/auth/UserRegistration";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen">
      <Suspense fallback={<div className="hidden lg:block"></div>}>
        <Sidebar />
      </Suspense>
      <div className="hidden lg:block"></div>
      <main className="p-5 bg-gray-200 dark:bg-black">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </main>
      <UserRegistration />
    </div>
  );
};

export default Layout;
