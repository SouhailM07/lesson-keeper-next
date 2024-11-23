import { formFieldRenderItem_t } from "@/types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function SelectFile({
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
            <Input
              type="file"
              {...props}
              // Manually handle the change event for file inputs
              onChange={(e) => {
                const file = e.target.files?.[0]; // Select the first file
                field.onChange(file); // Update the form value
              }}
            />
          </FormControl>
          <FormMessage className="text-[0.7rem]" />
        </FormItem>
      )}
    />
  );
}
