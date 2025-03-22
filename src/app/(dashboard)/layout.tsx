"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useUser } from "@clerk/nextjs";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, user } = useUser();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      if (isSignedIn && user) {
        try {
          const response = await fetch(`/api/check-user?clerkId=${user.id}`);
          const data = await response.json();
          
          if (data.exists) {
            setIsRegistered(true);
          } else {
            await fetch("/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                clerkId: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                username: user.username,
              }),
            });
            setIsRegistered(true);
          }
        } catch (error) {
          console.error("Error checking user:", error);
        }
      }
    };

    checkUserExists();
  }, [isSignedIn, user]);

  return (
    <div className="wrapper block min-h-screen pb-20 lg:grid lg:grid-cols-[300px,minmax(0,1fr)] lg:pb-0">
      <Sidebar />
      <main className="p-5 bg-gray-200 dark:bg-black">{children}</main>
    </div>
  );
};

export default Layout;
