import { InputHTMLAttributes } from "react";

export interface formFieldRenderItem_t
  extends InputHTMLAttributes<HTMLInputElement> {
  form?: any;
  name: string;
  formLabel: string;
}
