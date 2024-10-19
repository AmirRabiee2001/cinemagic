import {
  POPULAR_MOVIES_URL,
  SEARCH_URL,
  TOP_MOVIES_URL,
  TITLE_INFO_URL,
  MOVIE_RECOMMENDATIONS_URL,
  DISCOVER_URL,
} from "../utils/constants";

export async function getPopularMovies() {
  const response = await fetch(`${POPULAR_MOVIES_URL}1`);
  const data = await response.json();

  const movieDetailPromises = data.imdbIds.map(async (id) => {
    const movieResponse = await fetch(`${TITLE_INFO_URL}${id}`);
    const movieData = await movieResponse.json();
    return movieData;
  });

  const movieDetails = await Promise.all(movieDetailPromises);

  return movieDetails;
}

export async function getTopMovies() {
  const response = await fetch(`${TOP_MOVIES_URL}1`);
  const data = await response.json();

  const movieDetailPromises = data.imdbIds.map(async (id) => {
    const movieResponse = await fetch(`${TITLE_INFO_URL}${id}`);
    const movieData = await movieResponse.json();
    return movieData;
  });

  const movieDetails = await Promise.all(movieDetailPromises);

  return movieDetails;
}

export async function getDiscover(type, genre, yearStart, yearEnd, page = "1") {
  const response = await fetch(
    `${DISCOVER_URL}?type=${type}&genre=${genre}&yearStart=${yearStart}&yearEnd=${yearEnd}&page=${page}`
  );
  const data = await response.json();

  const movieDetailPromises = data.imdbIds
    .filter((id) => id !== null) // Filter out null ids
    .map(async (id) => {
      const movieResponse = await fetch(`${TITLE_INFO_URL}${id}`);
      const movieData = await movieResponse.json();
      return movieData;
    });

  const movieDetails = await Promise.all(movieDetailPromises);

  return movieDetails;
}

export async function searchTitle(query) {
  const response = await fetch(`${SEARCH_URL}${query}`);
  const data = await response.json();

  return data;
}

export async function getTitle(id) {
  const response = await fetch(`${TITLE_INFO_URL}${id}`);
  const data = await response.json();

  return data;
}

export async function getMovieRecommendations(id) {
  const tmdbInfoResponse = await fetch(`https://imdb-api.amir-rabiee2001.workers.dev/title/${id}/tmdbInfo`);
  const tmdbInfo = await tmdbInfoResponse.json();

  const recommendedMoviesResponse = await fetch(`${MOVIE_RECOMMENDATIONS_URL}${tmdbInfo.movie_results[0].id}`);
  const recommendedMovies = await recommendedMoviesResponse.json();

  // Fetch all movie details, using Promise.allSettled to handle failures gracefully
  const movieDetailPromises = recommendedMovies.imdbIds.map(async (id) => {
    try {
      const movieResponse = await fetch(`${TITLE_INFO_URL}${id}`);
      const movieData = await movieResponse.json();
      return movieData;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return null; // Return null if the request fails
    }
  });

  const movieResults = await Promise.allSettled(movieDetailPromises);

  // Filter out only the fulfilled promises
  const successfulMovies = movieResults
    .filter((result) => result.status === "fulfilled" && result.value !== null)
    .map((result) => result.value);

  return successfulMovies;
}

export async function getBookmarkedTitles(bookmarks) {
  const movieDetailPromises = bookmarks.map(async (bookmark) => {
    const movieResponse = await fetch(`${TITLE_INFO_URL}${bookmark.imdb_id}`);
    const movieData = await movieResponse.json();
    return movieData;
  });

  const movieDetails = await Promise.all(movieDetailPromises);

  return movieDetails;
}
