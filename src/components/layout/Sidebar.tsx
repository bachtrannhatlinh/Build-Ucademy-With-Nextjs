"use client";

import React, { useMemo } from "react";
import { menuItems } from "@/constants";
import ActiveLink from "@/components/common/ActiveLink";
import { TMenuItem } from "@/types";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { IconUsers } from "@/components/icons";

export const MenuItem = React.memo(({ url = "/", title = "", icon, onlyIcon }: TMenuItem) => {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
});

MenuItem.displayName = 'MenuItem';

export default function Sidebar() {
  const { userId } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const renderedMenuItems = useMemo(() => {
    return menuItems.map((item, index) => (
      <MenuItem
        key={index}
        url={item.url}
        title={item.title}
        icon={item.icon}
      />
    ));
  }, []);

  return (
    <div className="hidden p-5 border-r borderDarkMode bgDarkMode lg:flex flex-col fixed top-0 left-0 h-screen bottom-0 w-[300px]">
      <a href="/" className="font-bold text-3xl inline-block mb-5">
        Ucademy
      </a>
      <ul className="flex flex-col gap-2">
        {renderedMenuItems}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-2">
        <ModeToggle />
        {mounted && (
          <>
            {!userId ? (
              <Link
                href="/sign-up"
                className="size-10 rounded-lg bg-slate-500 text-white flex items-center justify-center p-1"
              >
                <IconUsers />
              </Link>
            ) : (
              <UserButton />
            )}
          </>
        )}
      </div>
    </div>
  );
}
