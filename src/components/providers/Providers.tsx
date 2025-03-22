"use client";

import { ThemeProvider } from "@/components/common/ThemeProvider";
import { UserProvider } from "@/contexts";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the UserProvider to prevent it from being included in the initial server render
const DynamicUserProvider = dynamic(() => Promise.resolve(UserProvider), {
  ssr: false,
});

function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <DynamicUserProvider>
        {children}
        <ToastContainer 
          autoClose={2000}
          hideProgressBar={true}
          className="text-sm font-medium"
          position="top-right"
        />
      </DynamicUserProvider>
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientProviders>{children}</ClientProviders>
      </Suspense>
    </ClerkProvider>
  );
} 