import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("ایمیل یا رمز عبور اشتباه است");
    },
  });

  return { login, isLoading };
}
