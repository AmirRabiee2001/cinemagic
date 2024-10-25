import { IMDB_INFO_URL, options } from "../utils/constants";

// Get IMDB id from TMDB id
export async function getIMDBId(tmdbId, type) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}/external_ids`, options);

    const data = await response.json();
    return data.imdb_id;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

// Get IMDB Scraped info
export async function getIMDBInfo(imdbId) {
  try {
    const response = await fetch(`${IMDB_INFO_URL}${imdbId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

// Helper function to get IMDb data from TMDB result
export async function getIMDbDataFromTMDB(tmdbResult, type) {
  try {
    // Get the IMDb ID from the TMDB ID
    const imdbId = await getIMDBId(tmdbResult.id, type);
    if (!imdbId) {
      throw new Error("IMDb ID not found for TMDB result");
    }
    // Get IMDb information using the retrieved IMDb ID
    const imdbData = await getIMDBInfo(imdbId);
    return imdbData;
  } catch (error) {
    console.log(error.message);
    return null; // Return null if there's an error, so it can be handled later
  }
}

// Get top_rated and popular lists for both movie and tv
export async function getLists(type, page, list) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${list}?language=en-US&page=${page}`, options);
    const data = await response.json();

    // Use TMDB results to get corresponding IMDb information
    const imdbResults = await Promise.all(data.results.map((tmdbResult) => getIMDbDataFromTMDB(tmdbResult, type)));

    // Filter out any null results (i.e., failed fetches)
    return imdbResults.filter((result) => result !== null);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

// Discover results with filters for both tv and movie
export async function getDiscover(type, genre, yearStart, yearEnd, page = "1") {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&${
        type === "movie" ? "release_date" : "first_air_date"
      }.gte=${yearStart}-01-01&${
        type === "movie" ? "release_date" : "first_air_date"
      }.lte=${yearEnd}-01-01&sort_by=popularity.desc&with_genres=${genre}`,
      options
    );

    const data = await response.json();

    // Use TMDB results to get corresponding IMDb information
    const imdbResults = await Promise.all(data.results.map((tmdbResult) => getIMDbDataFromTMDB(tmdbResult, type)));

    // Filter out any null results
    return imdbResults.filter((result) => result !== null);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

// Search a title
export async function searchTitle(query) {
  try {
    const response = await fetch(`https://imdb-api.amir-rabiee2001.workers.dev/search?query=${query}`);

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

// Get Recommendations for both tv and movie
export async function getRecommendations(imdbId, type) {
  try {
    // Step 1: Convert IMDb ID to TMDB ID
    const tmdbIdResponse = await fetch(`https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`, options);

    const tmdbIdData = await tmdbIdResponse.json();

    // Extract TMDB ID depending on the type (movie or tv)
    const tmdbId = type === "movie" ? tmdbIdData.movie_results[0]?.id : tmdbIdData.tv_results[0]?.id;

    if (!tmdbId) {
      throw new Error("TMDB ID not found for the provided IMDb ID");
    }

    // Step 2: Use TMDB ID to get recommendations
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${tmdbId}/recommendations?language=en-US&page=1`,
      options
    );

    const data = await response.json();

    // Step 3: Use TMDB results to get corresponding IMDb information
    const imdbResults = await Promise.all(data.results.map((tmdbResult) => getIMDbDataFromTMDB(tmdbResult, type)));

    // Filter out any null results
    return imdbResults.filter((result) => result !== null);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export async function getBookmarkedTitles(bookmarks) {
  const titleDetailPromises = bookmarks.map(async (bookmark) => {
    const titleResponse = await fetch(IMDB_INFO_URL + bookmark.imdb_id);

    const titleData = await titleResponse.json();
    return titleData;
  });

  const titleDetails = await Promise.all(titleDetailPromises);

  return titleDetails;
}

export async function getSeriesEpisodes(id, selectedSeason) {
  const response = await fetch(`${IMDB_INFO_URL}${id}/season/${selectedSeason}`);

  const data = await response.json();
  return data;
}
