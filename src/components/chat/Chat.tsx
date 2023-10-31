"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Conversations from "./conversation/Conversations";
import Feeds from "./feeds/Feeds";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

function Chat({ session }: Props) {
  return (
    <div className="h-screen w-full flex">
      <Conversations session={session} />
      <Feeds session={session} />
    </div>
  );
}

export default Chat;
