"use client";
import { ApolloWrapper } from "@/app/operations/ApolloWrapper";
// import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

type Props = {};

function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloWrapper>
      <SessionProvider>{children}</SessionProvider>
    </ApolloWrapper>
  );
}

export default Providers;
