"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import userOperations from "@/app/operations/user";
import { useMutation } from "@apollo/client";
import { UsernameData, UsernameVariables } from "@/lib/typesdefs";
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function Username() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  // api

  const [createUsernameMutation, { data, loading, error }] = useMutation<
    UsernameData,
    UsernameVariables
  >(userOperations.Mutations.createUsername);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { username } = data;

    try {
      await createUsernameMutation({ variables: { username } });
    } catch (error) {}
  }

  return (
    <div className="w-full max-w-md mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create a Username</FormLabel>

                <FormControl>
                  <Input placeholder="eg @devNate" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" variant={"secondary"}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
