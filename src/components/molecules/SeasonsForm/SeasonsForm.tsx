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
  handleDelete = (itemId: string) => {},
}) {
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    await handleOnSubmit(values, itemId);
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
        <div className="flexBetween">
          <Button type="submit">{itemId ? "Update" : "Submit"}</Button>
          {itemId && (
            <Button onClick={() => handleDelete(itemId)} type="button">
              Delete
            </Button>
          )}
        </div>
        <DialogClose ref={closeDialogRef} />
      </form>
    </Form>
  );
}
