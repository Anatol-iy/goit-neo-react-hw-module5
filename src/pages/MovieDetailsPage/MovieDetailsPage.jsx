import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../../api/movies";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.log(error);
        setError("Something went wrong while fetching the movie details.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />} 
      {error && <Error message={error} />}
      {movie &&
        !error && ( 
          <div className={css.container}>
            <div className={css.descriptionText}>
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className={css.poster}
              />
              <div>
                <h2 className={css.title}>
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </h2>
                <p className={css.userScore}>
                  User score: {movie.vote_average}
                </p>
                <p className={css.sectionTitle}>Overview</p>
                <p>{movie.overview}</p>
                <p className={css.sectionTitle}>Genres</p>
                <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
              </div>
            </div>
            <p className={css.underImage}>Additional information</p>
            <ul className={css.extraInfoLinks}>
              <li>
                <Link to="cast" state={{ from: location }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: location }}>
                  Reviews
                </Link>
              </li>
            </ul>
            <Outlet />
          </div>
        )}
    </div>
  );
};

export default MovieDetailsPage;
