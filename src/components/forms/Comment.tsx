"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/thread";
import * as z from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface ICommentProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({
  threadId,
  currentUserId,
  currentUserImg,
}: ICommentProps) => {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread({
      threadId,
      comment: values.thread,
      userId: JSON.stringify(currentUserId),
      path: pathname,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="comment-form"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="mt-10 flex flex-col items-center gap-1">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="profile pic"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment something"
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary-500 hover:bg-primary-500 hover:opacity-95"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
