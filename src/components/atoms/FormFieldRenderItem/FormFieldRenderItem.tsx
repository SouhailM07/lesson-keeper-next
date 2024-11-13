"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formFieldRenderItem_t } from "@/types";

export default function FormFieldRenderItem({
  form,
  name,
  formLabel,
  ...props
}: formFieldRenderItem_t) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <Input {...props} {...field} />
          </FormControl>
          <FormMessage className="text-[0.7rem] absolute  " />
        </FormItem>
      )}
    />
  );
}
