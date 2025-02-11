import { InputHTMLAttributes } from "react";

export interface formFieldRenderItem_t
  extends InputHTMLAttributes<HTMLInputElement> {
  form?: any;
  name: string;
  formLabel: string;
}

export interface ApiMessages {
  [key: string]: [string, number];
  create_item: [string, number];
  update_item: [string, number];
  delete_item: [string, number];
  not_found: [string, number];
}
