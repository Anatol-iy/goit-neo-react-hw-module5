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

// Функция для получения списка популярных фильмов за день с русским языком.
export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get("/trending/movie/day", {
    params: { language: "ru" }, // Указываем параметр языка
  });
  return response.data.results; // Возвращаем массив популярных фильмов.
};

// Функция для поиска фильмов по ключевому слову с русским языком.
export const searchMovies = async (query) => {
  const response = await axiosInstance.get("/search/movie", {
    params: { query, language: "ru" }, // Параметр поиска и языка
  });
  return response.data.results; // Возвращаем массив найденных фильмов.
};

// Функция для получения подробной информации о фильме по его ID с русским языком.
export const fetchMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`, {
    params: { language: "ru" }, // Указываем параметр языка
  });
  return response.data; // Возвращаем объект с деталями фильма.
};

// Функция для получения списка актеров фильма по его ID с русским языком.
export const fetchMovieCast = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`, {
    params: { language: "ru" }, // Указываем параметр языка
  });
  return response.data.cast; // Возвращаем массив с информацией об актерах.
};

// Функция для получения отзывов о фильме по его ID с русским языком.
export const fetchMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
    params: { language: "ru" }, // Указываем параметр языка
  });
  return response.data.results; // Возвращаем массив с отзывами.
};

// Функция для получения URL изображения по пути.
export const getImageUrl = (path) => {
  if (!path) {
    throw new Error("Необходим путь к изображению.");
  }

  return `${imageBaseUrl}${path}`;
};
