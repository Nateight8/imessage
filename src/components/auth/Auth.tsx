"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Username } from "./Username";

type Props = {
  session: Session | null;
};

function Auth({ session }: Props) {
  const { data } = useSession();

  console.log(data?.user.username);

  return (
    <div>
      {session?.user ? (
        <>
          <Username />
        </>
      ) : (
        <>
          <Button onClick={() => signIn("google")}>Continue with Google</Button>
        </>
      )}
    </div>
  );
}

export default Auth;
