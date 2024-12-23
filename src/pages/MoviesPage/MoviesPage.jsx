import { useState } from "react";
import { searchMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css"; 


const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const result = await searchMovies(query);
    setMovies(result);
  };



  return (
    <div>
      <h2>Search Movies</h2>
      <form className={css.form} onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie name"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
