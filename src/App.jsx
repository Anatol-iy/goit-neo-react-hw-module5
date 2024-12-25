import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";
import BackButton from "./components/BackButton/BackButton";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { useLocation } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

function App() {
  const location = useLocation();
  console.log("Current path:", location.pathname); // Выведем текущий путь для отладки

  // Показывать кнопку "Back" только на страницах с деталями фильма
  const shouldShowBackButton = location.pathname.includes("/movies/");

  return (
    <ErrorBoundary>
      <Navigation />
      {/* Показываем кнопку "Back" только если находимся на страницах с деталями фильма */}
      {shouldShowBackButton && <BackButton />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
