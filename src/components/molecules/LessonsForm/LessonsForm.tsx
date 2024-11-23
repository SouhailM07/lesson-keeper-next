"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// shadcn-ui
import { Form } from "@/components/ui/form";
import FormFieldRenderItem from "@/components/atoms/FormFieldRenderItem/FormFieldRenderItem";
import SelectFile from "@/components/SelectFile/SelectFile";
import { formFieldRenderItem_t } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "File cannot be empty" }),
});

export default function LessonsForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      file: undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
