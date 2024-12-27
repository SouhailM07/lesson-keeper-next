"use client";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

export enum FUNC_BUTTON_e {
  Back = "BACK",
}

interface FUNC_BUTTON_i extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: FUNC_BUTTON_e;
}

export default function FUNC_BUTTON({ buttonType, ...props }: FUNC_BUTTON_i) {
  const router = useRouter();
  // ! handlers
  const handle_back = () => router.back();
  //
  switch (buttonType) {
    case "BACK":
      return (
        <button
          onClick={handle_back}
          className="bg-black text-white px-4 py-2 rounded-sm"
          {...props}
        >
          Back
        </button>
      );
  }
}
