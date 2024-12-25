import { Link } from "react-router-dom"; 
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => (
  <ul className={css.movieList}>
    {movies.map((movie) => (
      <li key={movie.id}>
        <Link to={`/movies/${movie.id}`}>
          <h3 className={css.movieTitle}>{movie.title}</h3>
        </Link>
      </li>
    ))}
  </ul>
);

export default MovieList;

