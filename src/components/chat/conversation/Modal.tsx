import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import userOperations from "@/app/operations/user";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  SearchUserInput,
  SearchedUser,
  SearchsUsersData,
  createConversationData,
  createConversationInput,
} from "@/lib/typesdefs";
import SearchUsers from "./SearchUsers";
import conversationOperations from "@/app/operations/conversation";
import { useSession } from "next-auth/react";
import Participants from "./Participants";
import { Session } from "next-auth";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface Props {
  session: Session;
}

export function Modal({ session }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  // query

  const [searchUser, { data, error, loading }] = useLazyQuery<
    SearchsUsersData,
    SearchUserInput
  >(userOperations.Queries.searchUsers);

  //   create contact list

  const [createConversationMutation, { loading: loadingConversation }] =
    useMutation<createConversationData, createConversationInput>(
      conversationOperations.Mutations.createConversation
    );

  function onSubmit(user: z.infer<typeof FormSchema>) {
    const { username } = user;

    searchUser({ variables: { username } });

    // setOpen(false);
  }

  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const addParticipant = (user: SearchedUser) => {
    if (participants.includes(user)) {
      return participants;
    }

    setParticipants((prev) => [...prev, user]);
  };

  const removePart = (userId: string) => {
    setParticipants((part) => part.filter((item) => item.id !== userId));
  };

  const [open, setOpen] = useState(false);

  const modalHandler = () => {
    setOpen(!open);
  };

  //   get signed in user (YOU)

  const signedInuser = session?.user.id;

  const createConversation = async () => {
    const participantId = participants.map((part) => part.id);

    try {
      const { data } = await createConversationMutation({
        variables: { participantId: [...participantId, signedInuser] },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={modalHandler}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Find or Start a conversation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input placeholder="search username..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              type="submit"
              variant="secondary"
              className="w-full"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </Form>
        {data?.searchUsers && (
          <SearchUsers
            addParticipant={addParticipant}
            users={data.searchUsers}
          />
        )}
        {participants && (
          <>
            <Participants participants={participants} removePart={removePart} />
            <Button
              onClick={createConversation}
              variant={"default"}
              className="w-full"
              disabled={participants.length === 0}
            >
              {loadingConversation
                ? "Starting conversation"
                : "Start Conversion"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
