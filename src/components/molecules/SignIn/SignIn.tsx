"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// shadcn-ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

interface formFieldRenderItem_t extends InputHTMLAttributes<HTMLInputElement> {
  form?: any;
  name: string;
  formLabel: string;
}

export default function SignIn() {
  const formSchema = z.object({
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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const inputs: formFieldRenderItem_t[] = [
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
    },
    {
      name: "confirmPassword",
      formLabel: "Confirm Password",
      placeholder: "Enter your Password again",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[20rem] space-y-3"
      >
        {inputs.map((e, i) => (
          <InputRenderItem key={i} form={form} {...e} />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const InputRenderItem = ({
  form,
  name,
  formLabel,
  ...props
}: formFieldRenderItem_t) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{formLabel}</FormLabel>
        <FormControl>
          <Input {...props} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
