import React from "react";
import PageNotFound from "@/app/not-found";
import { getUserInfo } from "@/lib/actions/user.actions";
import { UserRole } from "@/constants";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-up");
  }

  const user = await getUserInfo({ userId });

  if(user && user.role !== UserRole.ADMIN) return <PageNotFound />

  return <div>{children}</div>;
};

export default AdminLayout;
