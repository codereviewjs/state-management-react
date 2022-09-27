import { ITheme } from "types";
import { Link } from "react-router-dom";
import styles from "./ThemeCard.module.css";
import { routes } from "../../../../constants/routes.constants";

interface Props {
  theme: ITheme;
}

const ThemeCard = ({ theme }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Link
          className={styles.themeTitle}
          to={`${routes.themes.root}/${theme.title}`}
        >
          {theme.title}
        </Link>
        <Link className='author' to={`/author/${theme.author}`}>
          {theme.author}
        </Link>
      </div>
    </div>
  );
};

export default ThemeCard;
