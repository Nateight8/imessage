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
import { useLazyQuery, useQuery } from "@apollo/client";
import { SearchUserInput, SearchsUsersData } from "@/lib/typesdefs";
import SearchUsers from "./SearchUsers";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function Modal() {
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

  function onSubmit(user: z.infer<typeof FormSchema>) {
    const { username } = user;

    searchUser({ variables: { username } });

    // setOpen(false);
  }

  console.log("here is data:", data?.searchUsers);

  const [open, setOpen] = useState(false);

  const modalHandler = () => {
    setOpen(!open);
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
              {loading ? "Loading..." : "Search"}
            </Button>
          </form>
        </Form>
        {data?.searchUsers && <SearchUsers users={data.searchUsers} />}
      </DialogContent>
    </Dialog>
  );
}
