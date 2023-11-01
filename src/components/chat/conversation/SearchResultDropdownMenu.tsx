"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useMutation } from "@apollo/client";
import conversationOperations from "@/app/operations/conversation";
import {
  createConversationData,
  createConversationInput,
} from "@/lib/typesdefs";

export function SearchResultDropdownMenu() {
  const [createConversationMutation, { loading, data, error }] = useMutation<
    createConversationData,
    createConversationInput
  >(conversationOperations.Mutations.creatConversation);

  const createConversation = async () => {
    try {
      const {} = await createConversationMutation({
        variables: { participantsId: [] },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem onClick={() => createConversation()}>
          Select
        </DropdownMenuItem>
        <DropdownMenuItem>Block</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
