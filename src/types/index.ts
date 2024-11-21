import { InputHTMLAttributes } from "react";

export interface formFieldRenderItem_t
  extends InputHTMLAttributes<HTMLInputElement> {
  form?: any;
  name: string;
  formLabel: string;
}

interface ResponseMessage {
  msg: string;
  status: number;
}

export interface ResponseMessages {
  not_found: ResponseMessage;
  create_item: ResponseMessage;
  update_item: ResponseMessage;
  delete_item: ResponseMessage;
}
