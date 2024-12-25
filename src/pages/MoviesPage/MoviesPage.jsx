import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../../api/movies"; 
import MovieList from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error"; 
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(""); 

  // Функция для поиска фильмов
  const handleSearch = useCallback(
    async (query) => {
      if (query.trim() === "") {
        setError("Please enter a movie name.");
        setMovies([]);
        return;
      }

      setError("");

      try {
        const result = await searchMovies(query); 

        if (result.length === 0) {
          setError("No movies found. Please try another search.");
          setMovies([]);
        } else {
          setMovies(result); // Обновляем список фильмов
        }
      } catch (error) {
        setError("Something went wrong. Please try again later."); // Обработка ошибок
        setMovies([]);
      }

      navigate(`?query=${query}`); // Обновляем URL с запросом
    },
    [navigate]
  );

  // Эффект для обработки изменения query параметра в URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search).get("query") || "";
    setQuery(queryParams);

    if (queryParams) {
      handleSearch(queryParams);
    }
  }, [location.search, handleSearch]);

  // Обработчик изменения input
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query); // Выполняем поиск при отправке формы
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter movie name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <Error message={error} />} {/* Отображаем компонент ошибки */}
      <MovieList movies={movies} /> {/* Отображаем список фильмов */}
    </div>
  );
};

export default MoviesPage;
