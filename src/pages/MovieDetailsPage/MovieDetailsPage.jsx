import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../../api/movies";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const MovieDetailsPage = () => {
 
  const { movieId } = useParams(); // Получение параметра movieId из URL (идентификатор фильма).

  const [movie, setMovie] = useState(); // Состояние для хранения информации о фильме.
  const [loading, setLoading] = useState(false); // Состояние для отображения индикатора загрузки.
  const [error, setError] = useState(false); // Состояние для отображения ошибки, если что-то пойдет не так.

  useEffect(() => {
    // Хук useEffect для выполнения побочного эффекта при изменении movieId.
    if (!movieId) return; 

    async function fetchData() {

      try {
        setLoading(true); // Устанавливаем состояние загрузки в true.
        setError(false); // Устанавливаем состояние ошибки в false (на всякий случай сбрасываем старые ошибки).

        const movie = await fetchMovieDetails(movieId); // Запрос на получение данных о фильме по movieId.
        setMovie(movie); // Сохраняем полученные данные в состоянии movie.
      } catch (error) {
        // Если произошла ошибка при получении данных.
        console.log(error); // Логируем ошибку в консоль.
        setError(true); // Устанавливаем состояние ошибки в true.
      } finally {
        setLoading(false); // В любом случае устанавливаем состояние загрузки в false после завершения запроса.
      }
    }
    fetchData(); // Вызов асинхронной функции fetchData.
  }, [movieId]); // Эффект сработает при изменении значения movieId.

  return (
    <div>
      {loading && <Loader />}
      Loader.
      {error && <Error />}
      {movie && ( // Если данные о фильме получены, отображаем информацию о фильме.
        <div className={css.container}>
          <div className={css.descriptionText}>
            <img
              src={getImageUrl(movie.poster_path)} // Формируем URL для изображения постера фильма.
              alt={movie.title} // Описание изображения (название фильма).
              className={css.poster} // Применяем стили для изображения.
            />
            <div>
              <h2 className={css.title}>
                {movie.title} ({movie.release_date.slice(0, 4)}){" "}
                {/* Название фильма и год выпуска */}
              </h2>
              <p className={css.userScore}>User score: {movie.vote_average}</p>{" "}
              {/* Оценка фильма */}
              <p className={css.sectionTitle}>Overview</p>{" "}
              {/* Заголовок для описания фильма */}
              <p>{movie.overview}</p> {/* Описание фильма */}
              <p className={css.sectionTitle}>Genres</p>{" "}
              {/* Заголовок для жанров фильма */}
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>{" "}
              {/* Перечень жанров, разделенных запятой */}
            </div>
          </div>
          <p className={css.underImage}>Additional information</p>{" "}
          <ul className={css.extraInfoLinks}>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
