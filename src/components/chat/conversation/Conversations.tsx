"use client";
import { Session } from "next-auth";
import React from "react";
import { Modal } from "./Modal";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

type Props = { session: Session };

function Conversations({ session }: Props) {
  return (
    <div className="border border-border h-full w-full md:w-80  p-4 flex flex-col justify-between">
      <Modal session={session} />
      <Button variant={"secondary"} onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
}

export default Conversations;
