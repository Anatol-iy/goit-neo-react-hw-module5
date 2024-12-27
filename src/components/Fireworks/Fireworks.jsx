import Confetti from "react-confetti";

const FireworksComponent = () => {
  return (
    <Confetti
      width={window.innerWidth} // Ширина окна браузера
      height={window.innerHeight} // Высота окна браузера
      gravity={0.03} // Гравитация, влияет на падение частиц
      numberOfPieces={500} // Количество частиц
      recycle={true} // После одного взрыва анимация прекращается
    />
  );
};

export default FireworksComponent;
