import { Session } from "next-auth";
import React from "react";

type Props = {
  session: Session;
};

function Feeds({ session }: Props) {
  return <div className="border border-border h-full">feed</div>;
}

export default Feeds;
