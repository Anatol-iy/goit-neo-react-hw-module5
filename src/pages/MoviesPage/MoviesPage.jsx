import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../../api/movies"; 
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = useCallback(
    async (query) => {
      if (query.trim() === "") return;
      const result = await searchMovies(query); 
      setMovies(result);
      navigate(`?query=${query}`); 
    },
    [navigate]
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search).get("query") || "";
    setQuery(queryParams);

    if (queryParams) {
      handleSearch(queryParams);
    }
  }, [location.search, handleSearch]); 

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query); 
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
      <MovieList movies={movies} /> 
    </div>
  );
};

export default MoviesPage;
