import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import FireworksComponent from "./components/Fireworks/Fireworks";

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
  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для модального окна
  const [isConfettiVisible, setIsConfettiVisible] = useState(false); // Состояние для салюта

  useEffect(() => {
    // Проверка, показывалось ли уже модальное окно
    const isModalShown = localStorage.getItem("modalShown");

    if (!isModalShown) {
      // Если модальное окно не показывалось ранее, показываем его через 3 секунды
      const timer = setTimeout(() => {
        setIsModalVisible(true);
        setIsConfettiVisible(true); // Показываем салют, когда открывается модальное окно
        localStorage.setItem("modalShown", "true"); // Сохраняем в localStorage, что окно показано
      }, 3000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }
  }, []);

  const closeModal = () => {
    setIsModalVisible(false); // Закрытие модального окна
    setIsConfettiVisible(false); // Прекращение отображения салюта
  };

  return (
    <ErrorBoundary>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        {/* Показываем компонент с салютом только если isConfettiVisible true */}
        {isConfettiVisible && <FireworksComponent />}

        <Routes>
          <Route path="/" element={<HomePage isModalVisible={isModalVisible} closeModal={closeModal} />} />
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
