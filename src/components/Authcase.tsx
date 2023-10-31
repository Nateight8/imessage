"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

function Authcase() {
  const { status, data } = useSession();

  if (status === "unauthenticated")
    return (
      <>
        <Button onClick={() => signIn("google")}>Sign in</Button>
      </>
    );

  return (
    <>
      <Button onClick={() => signOut()}>Sign out</Button>
      <p>{data?.user.id}</p>
    </>
  );
}

export default Authcase;
