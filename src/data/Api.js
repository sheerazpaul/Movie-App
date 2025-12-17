import { GET_MOVIES_DETAIL, GET_SIMILAR_MOVIES } from "../api.config"

async function fetchApi(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("API Error:", error)
    return null
  }
}

export async function getMoviesApi(page = 1) {
  return fetchApi(`${GET_MOVIES_LIST}?page=${page}`)
}


export async function getMovieDetail(id) {
  return fetchApi(
    `${GET_MOVIES_DETAIL}?movie_id=${id}&with_images=true&with_cast=true`
  )
}

export async function getSimilarMovie(id) {
  return fetchApi(`${GET_SIMILAR_MOVIES}?movie_id=${id}`)
}
