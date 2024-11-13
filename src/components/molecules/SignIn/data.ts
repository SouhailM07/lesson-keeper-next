import { formFieldRenderItem_t } from "@/types";
import { z } from "zod";

// ==============================================================================================
// sign In form schema
// ==============================================================================================

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
// ==============================================================================================
// inputs data
// ==============================================================================================
export const inputs: formFieldRenderItem_t[] = [
  {
    name: "username",
    formLabel: "Username",
    placeholder: "Enter your username",
  },
  {
    name: "email",
    formLabel: "Email",
    placeholder: "Enter your Email",
  },
  {
    name: "password",
    formLabel: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "confirmPassword",
    formLabel: "Confirm Password",
    placeholder: "Enter your Password again",
    type: "password",
  },
];
