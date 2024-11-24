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
import MyDialog from "@/components/atoms/MyDialog/MyDialog";

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
    closeDialogRef.current.click();
  };
  const inputs: formFieldRenderItem_t[] = [
    { name: "name", formLabel: "Season Name" },
  ];
  const closeDialogRef: any = useRef(null);
  console.log();
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
            <MyDialog title="Warning" trigger={<Button>Delete</Button>}>
              <div>
                <p>
                  You are about to Delete this
                  <span className="text-red-500"> season</span> and every
                  modules and lessons inside it , are you sure you want to
                  delete it ?
                </p>
              </div>
              <div className="flexBetween">
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      closeDialogRef.current.click();
                      handleDelete(itemId);
                    }}
                  >
                    Delete
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
              </div>
            </MyDialog>
          )}
        </div>
        <DialogClose ref={closeDialogRef} />
      </form>
    </Form>
  );
}
