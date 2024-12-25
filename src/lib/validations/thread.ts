import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters required!" }),
  accountId: z.string(),
});

export const CommunityValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters required!" }),
});