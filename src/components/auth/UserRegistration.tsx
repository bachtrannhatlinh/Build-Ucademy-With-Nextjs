"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/contexts/user-context";
import { useEffect, useState } from "react";

export default function UserRegistration() {
  const { userId } = useAuth();
  const { userInfo, setUserInfo } = useUserContext();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: userExists } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) return false;
      const response = await fetch(`/api/check-user?clerkId=${userId}`);
      const data = await response.json();
      return data.exists;
    },
    enabled: !!userId && mounted,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!userId) return;
      return fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: userId,
        }),
      });
    },
    onSuccess: async () => {
      queryClient.setQueryData(["user", userId], true);
      // Refresh user info after registration
      const user = await fetch(`/api/check-user?clerkId=${userId}`).then(res => res.json());
      if (user) {
        setUserInfo(user);
      }
    },
  });

  useEffect(() => {
    if (mounted && userId && userExists === false) {
      registerMutation.mutate();
    }
  }, [mounted, userId, userExists, registerMutation]);

  return null;
} 