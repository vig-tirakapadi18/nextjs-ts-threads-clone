"use client";

import React, { ChangeEvent, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import Image from "next/image";
import { RiImageCircleAiFill } from "react-icons/ri";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

export interface IUser {
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
}

interface IAccountProfileProps {
  user: IUser;
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: IAccountProfileProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profilePhoto: user?.image,
      name: user?.name,
      username: user?.username,
      bio: user?.bio,
    },
  });

  const imageUploadHandler = (
    event: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    event.preventDefault();

    const fileReader = new FileReader();
    if (event.target.files && event.target.files?.length > 0) {
      const file = event.target.files[0];

      setFiles(Array.from(event.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() ?? "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const submitHandler = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profilePhoto;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profilePhoto = imgRes[0].url;
      }
    }

    // TODO: UPDATE YOUR PROFILE
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profilePhoto"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile pic"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <RiImageCircleAiFill size={32} color="dodgerblue" />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a Photo"
                  onChange={(event) =>
                    imageUploadHandler(event, field.onChange)
                  }
                  className="bg-dark-3 text-white border-gray-700 border-[1px]"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="flex items-center text-light-2">
                Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  placeholder="Enter Your Name"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="flex items-center text-light-2">
                Username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  placeholder="Enter Your Username"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="flex items-center text-light-2">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  rows={10}
                  placeholder="Add a Bio"
                  className="account-form_input no-focus"
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
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
