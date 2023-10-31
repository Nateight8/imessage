import { Session } from "next-auth";
import React from "react";
import { Modal } from "./Modal";

type Props = { session: Session };

function Conversations({ session }: Props) {
  return (
    <div className="border border-border h-full w-full md:w-80  p-4">
      <Modal />
    </div>
  );
}

export default Conversations;
