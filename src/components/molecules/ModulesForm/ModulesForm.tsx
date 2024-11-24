import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// shadcn-ui
import { Form } from "@/components/ui/form";
import { formFieldRenderItem_t } from "@/types";
import FormFieldRenderItem from "@/components/atoms/FormFieldRenderItem/FormFieldRenderItem";
import { DialogClose } from "@/components/ui/dialog";
import { closeThatDialog } from "@/lib/aliases";

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
  itemId = "",
  handleDelete = (itemId: string) => {},
}) {
  const closeDialogRef: any = useRef(null);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const inputs: formFieldRenderItem_t[] = [
    { name: "name", formLabel: "Module name" },
    { name: "mentor_name", formLabel: "Mentor name" },
  ];
  // ! handlers

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await handleOnSubmit(values, itemId);
    closeThatDialog(closeDialogRef);
  };

  const handleBtnDelete = async () => {
    closeThatDialog(closeDialogRef);
    await handleDelete(itemId);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {inputs.map((e, i) => (
          <FormFieldRenderItem key={i} {...e} form={form} />
        ))}
        <div className="flexBetween ">
          <Button type="submit">{itemId ? "Update" : "Submit"}</Button>
          {itemId && (
            <Button onClick={handleBtnDelete} type="button">
              Delete
            </Button>
          )}
        </div>
        <DialogClose className="absolute z-[-1]" ref={closeDialogRef} />
      </form>
    </Form>
  );
}
