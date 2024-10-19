import supabase from "./supabase";

export async function getBookmarks() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return;
  }

  const userId = session.session.user.id;
  const { data, error } = await supabase.from("bookmarks").select("imdb_id").eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Add a bookmark for a movie's IMDb ID
export async function addBookmark(imdbId) {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    throw new Error("Not logged in");
  }

  const userId = session.session.user.id;
  const { data, error } = await supabase.from("bookmarks").insert([{ user_id: userId, imdb_id: imdbId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Remove a bookmark for a movie's IMDb ID
export async function removeBookmark(imdbId) {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    throw new Error("Not logged in");
  }

  const userId = session.session.user.id;
  const { data, error } = await supabase.from("bookmarks").delete().eq("user_id", userId).eq("imdb_id", imdbId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
