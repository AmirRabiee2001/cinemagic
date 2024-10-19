import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export default function useUser() {
  const { isLoading, data: user } = useQuery(["user"], getCurrentUser);

  return { isLoading, user, isLoggedIn: user?.role === "authenticated" };
}
