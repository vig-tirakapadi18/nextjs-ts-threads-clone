import * as z from "zod";

export const UserValidation = z.object({
  profilePhoto: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Atleast 3 characters required!" })
    .max(30, { message: "Maximum 30 characters allowed!" }),
  username: z
    .string()
    .min(3, { message: "Atleast 3 characters required!" })
    .max(30, { message: "Maximum 30 characters allowed!" }),
  bio: z
    .string()
    .min(5, { message: "Atleast 5 characters required!" })
    .max(300, { message: "Maximum 300 characters allowed!" }),
});
