import { useNavigate } from "react-router-dom";
import css from "./BackButton.module.css";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button className={css.backButton} onClick={() => navigate(-1)}>
      <span className={css.arrow}>←</span> Go back
    </button>
  );
}

export default BackButton;
