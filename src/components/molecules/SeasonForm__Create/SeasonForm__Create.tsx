"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// shadcn-ui
import { Form } from "@/components/ui/form";
import FormFieldRenderItem from "@/components/atoms/FormFieldRenderItem/FormFieldRenderItem";
import { formFieldRenderItem_t } from "@/types";
import SelectTime from "@/components/SelectTime/SelectTime";
import { useUser } from "@clerk/nextjs";
import { API_APP_URL } from "@/lib/API_APP_URL";
import { DialogClose } from "@/components/ui/dialog";
import { useRef } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  duration: z.string(),
});

export default function SeasonForm__Create() {
  // 1. Define your form.
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await axios
        .post(`${API_APP_URL}/api/seasons`, { ...values, userId: user?.id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const inputs: formFieldRenderItem_t[] = [
    { name: "name", formLabel: "Season Name" },
    // { name: "duration", formLabel: "Season duration" },
  ];
  const closeDialogRef: any = useRef(null);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {inputs.map((e, i) => (
          <FormFieldRenderItem
            form={form}
            key={i}
            {...e}
            placeholder={`Enter The Season ${e.name}`}
          />
        ))}
        <SelectTime form={form} name="duration" formLabel="Duration" />
        <Button type="submit">Submit</Button>
        <DialogClose ref={closeDialogRef} />
      </form>
    </Form>
  );
}
