import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchedUser } from "@/lib/typesdefs";
import React from "react";

type Props = {
  participants: SearchedUser[];
  removePart: (userId: string) => void;
};

function Participants({ participants, removePart }: Props) {
  return (
    <div>
      <h2>{participants.length}</h2>
      {participants.map(({ id, username }) => (
        <div key={id}>
          <>
            <div className="flex justify-between">
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
              {/* <SearchResultDropdownMenu /> */}
              <Button onClick={() => removePart(id)} variant={"outline"}>
                Remove
              </Button>
            </div>
            <Separator className="my-2" />
          </>
        </div>
      ))}
    </div>
  );
}

export default Participants;
