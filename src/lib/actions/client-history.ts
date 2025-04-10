"use client";

import { TCreateHistoryParams } from "@/types";

export async function createHistoryClient(params: TCreateHistoryParams) {
  try {
    const response = await fetch("/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create history");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error creating history:", error);
    return null;
  }
} 