import { useStoreContext } from "../../context/Store.context";
import styles from "./Themes.module.css";
import ThemeCard from "./components/ThemeCard/ThemeCard";

const Themes = () => {
  const { themes, setSelectedTheme } = useStoreContext();
  return (
    <div>
      <h1>Themes</h1>
      <div className={styles.themes}>
        {themes.map((theme) => (
          <ThemeCard
            onApply={setSelectedTheme}
            theme={theme}
            key={`${theme.title}-${theme.author}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Themes;
