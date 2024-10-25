import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: () => {
      toast.success("با موفقیت وارد شدید!");
      queryClient.invalidateQueries(["user"]);
      navigate("/");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("ایمیل یا رمز عبور اشتباه است");
    },
  });

  return { login, isLoading };
}
