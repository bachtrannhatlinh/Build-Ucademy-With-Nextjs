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
    <>
      <Link
        href={url}
        className={`!p-3 !rounded-md flex items-center gap-3 transition-all svg-animate
    ${
      isActive
        ? "text-white bg-purple-400"
        : "hover:text-purple-400 hover:bg-purple-400/50 hover:bg-opacity/10 dark:text-white"
    }
      `}
      >
        {children}
      </Link>
    </>
  );
};

export default ActiveLink;