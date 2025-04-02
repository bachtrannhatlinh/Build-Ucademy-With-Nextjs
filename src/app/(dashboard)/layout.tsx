"use client";

import React, { Suspense } from "react";
import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import UserRegistration from "@/components/auth/UserRegistration";
import { menuItems } from "@/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block pb-20 lg:pb-0 lg:grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen">
      <Suspense fallback={<div className="hidden lg:block"></div>}>
        <Sidebar />
      </Suspense>
      <ul className="flex p-3 bgDarkMode border-t borderDarkMode lg:hidden fixed w-full justify-center bottom-0 left-0 gap-5 h-16">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
            onlyIcon
          />
        ))}
      </ul>
      <div className="hidden lg:block"></div>
      <main className="p-5 bg-gray-200 dark:bg-black">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
      <UserRegistration />
    </div>
  );
};

export default Layout;
