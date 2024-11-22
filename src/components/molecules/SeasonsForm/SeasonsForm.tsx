"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// shadcn-ui
import { Form } from "@/components/ui/form";
import FormFieldRenderItem from "@/components/atoms/FormFieldRenderItem/FormFieldRenderItem";
import { formFieldRenderItem_t } from "@/types";
import SelectTime from "@/components/atoms/SelectTime/SelectTime";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@/components/ui/dialog";
import { useRef } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  duration: z.string(),
});

export default function SeasonForm({
  handleOnSubmit,
  defaultValues,
  itemId = null,
}) {
  // 1. Define your form.
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let selectedId = itemId ? itemId : user?.id;

    await handleOnSubmit(values, selectedId);
  };
  const inputs: formFieldRenderItem_t[] = [
    { name: "name", formLabel: "Season Name" },
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
