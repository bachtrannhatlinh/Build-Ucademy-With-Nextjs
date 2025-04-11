"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ActiveLinkProps {
  url: string;
  children: React.ReactNode;
}

const ActiveLink = ({ url, children }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname;

  return (
    <Link
      href={url}
      prefetch={true}
      scroll={false}
      className={`!p-3 !rounded-md flex items-center gap-3 dark:tex-grayDark text-base transition-all font-medium
      ${
        isActive
          ? "!text-primary bg-primary bg-opacity-10 svg-animate font-semibold"
          : "hover:!text-primary hover:!bg-primary hover:!bg-opacity-10"
      }
      `}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;