"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// shadcn-ui
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// components
import FormFieldRenderItem from "@/components/atoms/FormFieldRenderItem/FormFieldRenderItem";
// ? helpers
import { formSchema, inputs } from "./data";
import { useSignUp } from "@clerk/nextjs";

export default function SignIn() {
  const { signUp, isLoaded, setActive } = useSignUp();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // ! handlers
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    try {
      const { email, password, confirmPassword, username } = values;
      if (confirmPassword === password) {
        await signUp?.create({
          emailAddress: email,
          password,
          username,
        });
        await signUp?.prepareEmailAddressVerification();
        signUp && (await setActive({ session: signUp.createdSessionId }));
      } else {
        // ! add toast
        alert("password is not matched");
      }
    } catch (error) {
      console.log({ signInError: error });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[20rem] flex flex-col gap-y-5"
      >
        {inputs.map((e, i) => (
          <FormFieldRenderItem
            className="h-[2.4rem]"
            key={i}
            form={form}
            {...e}
          />
        ))}
        <Button type="submit" className="self-end">
          Submit
        </Button>
      </form>
    </Form>
  );
}
