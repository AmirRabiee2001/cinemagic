import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addBookmark as addBookmarkAPI, removeBookmark as removeBookmarkAPI } from "../services/apiBookmarks";

export default function useBookmarks() {
  const queryClient = useQueryClient();

  // Mutation to add a bookmark
  const { mutate: addBookmark, isLoading: isAdding } = useMutation({
    mutationFn: (imdbId) => addBookmarkAPI(imdbId),
    onSuccess: () => {
      // Invalidate bookmarks query to update the UI after adding a bookmark
      queryClient.invalidateQueries(["bookmarks"]);
      toast.success("فیلم با موفقیت نشان شد!");
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("خطایی در نشان کردن فیلم رخ داد");
    },
  });

  // Mutation to remove a bookmark
  const { mutate: removeBookmark, isLoading: isRemoving } = useMutation({
    mutationFn: (imdbId) => removeBookmarkAPI(imdbId),
    onSuccess: () => {
      // Invalidate bookmarks query to update the UI after removing a bookmark
      queryClient.invalidateQueries(["bookmarks"]);
      toast.success("فیلم با موفقیت از نشان‌ها حذف شد!");
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("خطایی در حذف نشان فیلم رخ داد");
    },
  });

  return { addBookmark, removeBookmark, isAdding, isRemoving };
}
