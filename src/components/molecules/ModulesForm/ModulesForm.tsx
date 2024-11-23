import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// shadcn-ui
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formFieldRenderItem_t } from "@/types";
import FormFieldRenderItem from "@/components/atoms/FormFieldRenderItem/FormFieldRenderItem";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "module name must be at least 3 characters.",
  }),
  mentor_name: z.string().min(3, {
    message: "mentor name must be at least 3 characters.",
  }),
});

export default function ModulesForm({
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
    { name: "name", formLabel: "Module name" },
    { name: "mentor_name", formLabel: "Mentor name" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {inputs.map((e, i) => (
          <FormFieldRenderItem key={i} {...e} form={form} />
        ))}
        <div className="flexBetween">
          <Button type="submit">{itemId ? "Update" : "Submit"}</Button>
          {itemId && (
            <Button onClick={() => handleDelete(itemId)} type="button">
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
