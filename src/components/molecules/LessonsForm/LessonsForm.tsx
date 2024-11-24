"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// shadcn-ui
import { Form } from "@/components/ui/form";
import FormFieldRenderItem from "@/components/atoms/FormFieldRenderItem/FormFieldRenderItem";
import SelectFile from "@/components/atoms/SelectFile/SelectFile";
import { formFieldRenderItem_t } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "File cannot be empty" }),
});

export default function LessonsForm({
  handleOnSubmit,
  defaultValues,
  itemId = null,
  fileId = null,
  handleDelete = (itemId, fileId) => {},
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
    { name: "name", formLabel: "Lesson Name" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {inputs.map((e, i) => (
          <FormFieldRenderItem key={i} form={form} {...e} />
        ))}
        <SelectFile name="file" formLabel="Lesson File" form={form} />
        <div className="flexBetween">
          <Button type="submit">Submit</Button>
          {itemId && (
            <Button onClick={() => handleDelete(itemId, fileId)} type="button">
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
