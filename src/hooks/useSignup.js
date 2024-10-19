import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success("حساب شما با موفقیت ایجاد شد!‌ می توانید وارد شوید");
    },
  });
  return { signup, isLoading };
}
