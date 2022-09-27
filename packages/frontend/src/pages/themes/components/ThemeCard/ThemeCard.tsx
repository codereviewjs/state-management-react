import { ITheme } from "types";
import { Link } from "react-router-dom";
import styles from "./ThemeCard.module.css";
import { routes } from "../../../../constants/routes.constants";
import { colors } from "../../../../constants/theme.constants";

interface Props {
  theme: ITheme;
  onApply: (theme: ITheme) => void;
}

function capitalize(str: string) {
  let firstLetter = str[0].toUpperCase();
  return `${firstLetter}${str.slice(1, str.length)}`;
}

const ThemeCard = ({ theme, onApply }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.themeTitle}>
          <Link to={`${routes.themes.root}/${theme.title}`}>{theme.title}</Link>
        </h3>
        <Link className='author' to={`/author/${theme.author}`}>
          {theme.author}
        </Link>
      </div>
      <div className={styles.cardBody}>
        {colors.map((color, i) => {
          const title = capitalize(color.replace("Color", ""));

          return (
            <div
              className={styles.colorContainer}
              key={`${color}-${theme[color]}-${theme.title}-${i}-${theme.author}`}
            >
              <span>{title}</span>
              <div
                className={styles.colorBox}
                style={{
                  backgroundColor: theme[color],
                }}
              />
              <small>{theme[color]}</small>
            </div>
          );
        })}
      </div>
      <div className={styles.cardFooter}>
        <button onClick={() => onApply(theme)}>Apply theme</button>
      </div>
    </div>
  );
};

export default ThemeCard;
