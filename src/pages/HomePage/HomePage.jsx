import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        setMovies([]);

        // Логирование перед загрузкой данных
        console.log("Fetching trending movies...");

        const movies = await fetchTrendingMovies();

        // Логирование полученных данных
        console.log("Fetched movies:", movies);

        setMovies(movies);
      } catch (error) {
        console.log("Error fetching movies:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today</h2>
      {loading && <Loader />}
      {error && <Error />}
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>No movies</p>}
    </div>
  );
};

export default HomePage;