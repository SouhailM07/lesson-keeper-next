import { ToastProps } from "@/components/ui/toast";

// export const API_APP_URL = "http://localhost:3000";
export const API_APP_URL = "https://lesson-keeper-next.vercel.app";

export const toast_duration: number = 3000;

export const toast_error_data: ToastProps = {
  title: "Something went wrong",
  duration: toast_duration,
  variant: "destructive",
};

export const toast_good: (res) => ToastProps = (res) => {
  return { title: res.data, duration: toast_duration };
};
