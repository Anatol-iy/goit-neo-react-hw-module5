import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import css from "./HomePage.module.css";
import FireworksComponent from "../../components/Fireworks/Fireworks";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для модального окна
  const [isConfettiVisible, setIsConfettiVisible] = useState(false); // Состояние для салюта

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        setMovies([]);

        const movies = await fetchTrendingMovies();
        setMovies(movies);
      } catch (error) {
        console.log("Error fetching movies:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Показываем модальное окно через 3 секунды
    const timer = setTimeout(() => {
      setIsModalVisible(true);
      setIsConfettiVisible(true); // Показываем салют, когда открывается модальное окно
    }, 3000);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsModalVisible(false); // Закрытие модального окна
    setIsConfettiVisible(false); // Прекращение отображения салюта
  };

  return (
    <div>
      {/* Показываем компонент с салютом только если isConfettiVisible true */}
      {isConfettiVisible && <FireworksComponent />}

      <h2 className={css.title}>Популярные фильмы сегодня</h2>
      {loading && <Loader />}
      {error && <Error />}
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>No movies</p>}

      {/* Модальное окно */}
      {isModalVisible && (
        <div className={css.modal}>
          <div className={css.modalContent}>
            <h3>
              Оксана, Нина, Оля!!!!
              <br />
              <br />
              Happy New Year!!!!
              <br />
              <br />
              В Новий рік бажаю щастя,
              <br />
              Щоб усе гаразд було.
              <br />
              Гарним буде хай ваш настрій,
              <br />
              А в душі — завжди тепло!
              <br />
              <br />
              Щоб складалися всі плани,
              <br />
              Щоб везіння вас любило,
              <br />
              Нехай рік щасливим стане —
              <br />
              Щастя, мудрості і сили!
              <br />
              <br />
              Толик, Юля, Олеся
            </h3>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
