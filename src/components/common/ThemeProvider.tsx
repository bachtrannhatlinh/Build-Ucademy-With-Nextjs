"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // Convert props to plain object if necessary
  const plainProps = JSON.parse(JSON.stringify(props));
  return <NextThemesProvider {...plainProps}>{children}</NextThemesProvider>
}