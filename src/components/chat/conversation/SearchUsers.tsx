import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SearchedUser } from "@/lib/typesdefs";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";
import { SearchResultDropdownMenu } from "./SearchResultDropdownMenu";

type Props = {
  users: SearchedUser[];
};

function SearchUsers({ users }: Props) {
  console.log(users);

  return (
    <>
      {users.length < 1 ? (
        <p>User not fund</p>
      ) : (
        <ScrollArea className="max-h-72 h-fit w-full">
          <div className="py-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Users from search...
            </h4>
            {users.map(({ id, username }) => (
              <>
                <div className="flex justify-between" key={id}>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      {/* <AvatarFallback>CN</AvatarFallback> */}
                    </Avatar>
                    <div className="">
                      <h3 className="text-base font-semibold">{username}</h3>
                      <h4 className="text-sm text-muted-foreground">
                        Lead Ux Designer
                      </h4>
                    </div>
                  </div>
                  <SearchResultDropdownMenu />
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
}

export default SearchUsers;
