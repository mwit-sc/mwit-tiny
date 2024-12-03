"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      {/* <NextUIProvider> */}
      <SessionProvider>
        {children}
      </SessionProvider>
      {/* </NextUIProvider> */}
    </>
  );
}