"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function UserRegistration() {
  const { isSignedIn, user } = useUser();
  const queryClient = useQueryClient();

  const { data: userExists } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => {
      if (!user?.id) return false;
      const response = await fetch(`/api/check-user?clerkId=${user.id}`);
      const data = await response.json();
      return data.exists;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!user) return;
      return fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username,
        }),
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(["user", user?.id], true);
    },
  });

  // Register user if they don't exist
  if (isSignedIn && user && userExists === false) {
    registerMutation.mutate();
  }

  return null;
} 