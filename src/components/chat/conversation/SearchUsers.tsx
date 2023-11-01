"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SearchedUser } from "@/lib/typesdefs";

import React, { useState } from "react";

type Props = {
  users: SearchedUser[];
  addParticipant: (user: SearchedUser) => void;
};

function SearchUsers({ users, addParticipant }: Props) {
  return (
    <>
      <>
        {users.length < 1 ? (
          <p>User not fund</p>
        ) : (
          <ScrollArea className="max-h-72 h-fit w-full">
            <div className="py-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Users from search...
              </h4>
              <div className="flex w-full flex-col ">
                {users.map((user) => (
                  <div key={user.id}>
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          {/* <AvatarFallback>CN</AvatarFallback> */}
                        </Avatar>
                        <div className="">
                          <h3 className="text-base font-semibold">
                            {user.username}
                          </h3>
                          <h4 className="text-sm text-muted-foreground">
                            Lead Ux Designer
                          </h4>
                        </div>
                      </div>
                      {/* <SearchResultDropdownMenu /> */}
                      <Button
                        onClick={() => addParticipant(user)}
                        variant={"outline"}
                      >
                        Select
                      </Button>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        )}
      </>
    </>
  );
}

export default SearchUsers;
