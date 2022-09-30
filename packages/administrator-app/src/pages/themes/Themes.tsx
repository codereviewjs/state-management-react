import { Layout } from "ui";
import { useStoreContext } from "../../context/Store.context";
import styles from "./Themes.module.css";
import { ThemeCard } from "../../components";

const Themes = () => {
  const { themes, setSelectedTheme, selectedTheme } = useStoreContext();
  return (
    <Layout title='Themes'>
      <div className={styles.themes}>
        {themes.map((theme) => (
          <ThemeCard
            isSelected={selectedTheme._id === theme._id}
            onApply={setSelectedTheme}
            theme={theme}
            key={`${theme.title}-${theme.author}`}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Themes;
