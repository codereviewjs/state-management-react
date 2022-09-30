import { Layout } from "ui";
import { ThemeCard } from "../../components";
import { useStoreContext } from "../../context/Store.context";
import styles from "./Authors.module.css";

const Authors = () => {
  const { authors, getAuthorsThemes, selectedTheme } = useStoreContext();

  return (
    <Layout title='Authors'>
      <div>
        {authors.map((author) => {
          return (
            <div className={styles.authorCard} key={author.name}>
              <h3>{author.name}</h3>
              <p>Themes</p>
              <div className={styles.themesContainer}>
                {getAuthorsThemes(author).map((theme) => (
                  <ThemeCard
                    isSelected={selectedTheme._id === theme._id}
                    className={styles.themesCard}
                    key={theme.title + theme.author}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Authors;
