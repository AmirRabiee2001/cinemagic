import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("با موفقیت خارج شدید");
    },
  });

  return { logout, isLoading };
}
