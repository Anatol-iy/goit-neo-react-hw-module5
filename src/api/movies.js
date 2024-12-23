import axios from "axios";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTVjOGUyNTczZTdkOGRmMjllNjVjYTgyMTkwMjU4OCIsIm5iZiI6MTczNDAyMDc0Ny44OTIsInN1YiI6IjY3NWIwZThiY2NmNGRmOTY2ODIzMDEyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HiUV3dafcyUu2_ZbcKBT3CjjsuNOivx1RhYjkY6J5_M";

const headers = {
  accept: "application/json", // Заголовок, указывающий, что принимаемый формат данных — JSON.
  Authorization: `Bearer ${apiKey}`, // Заголовок для авторизации, включающий Bearer-токен.
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers, // Устанавливает заголовки для всех запросов.
});

export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get("/trending/movie/day");
  // Выполняет GET-запрос к API для получения списка популярных фильмов за день.
  return response.data.results; // Возвращает массив популярных фильмов из ответа API.
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get("/search/movie", {
    params: { query }, // Передает параметр поиска (ключевое слово) в URL запроса.
  });
  return response.data.results; // Возвращает массив найденных фильмов.
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  // Выполняет GET-запрос для получения подробной информации о фильме по его ID.
  return response.data; // Возвращает объект с деталями фильма.
};

export const fetchMovieCast = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  // Выполняет GET-запрос для получения данных об актерском составе фильма.
  return response.data.cast; // Возвращает массив с информацией об актерах.
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  // Выполняет GET-запрос для получения отзывов о фильме.
  return response.data.results; // Возвращает массив с отзывами.
};

export const getImageUrl = (path) => {
  if (!path) {
    throw new Error("Image path is required.");
  }

  return `${imageBaseUrl}${path}`;
};
