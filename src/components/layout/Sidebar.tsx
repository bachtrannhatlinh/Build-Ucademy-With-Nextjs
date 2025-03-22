"use client";

import React from "react";
import { menuItems } from "@/constants";
import ActiveLink from "@/components/common/ActiveLink";
import { TMenuItem } from "@/types";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {IconUsers} from "@/components/icons";
import { useAuth } from "@clerk/clerk-react";

export default function Sidebar() {
  const { userId } = useAuth();

  function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
    return (
      <li>
        <ActiveLink url={url}>
          {icon}
          {title}
        </ActiveLink>
      </li>
    );
  }

  return (
    <div className="hidden p-5 border-r border-gray-200 bg-white  dark:bg-black lg:flex flex-col">
      <a href="/" className="font-bold text-3xl inline-block mb-5">
        Ucademy
      </a>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-2">
        <ModeToggle />
        {!userId ? (
          <>
            <Link
              href="/sign-up"
              className="size-10 rounded-lg bg-slate-500 text-white flex items-center justify-center p-1"
            >
              <IconUsers />
            </Link>
          </>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
}
