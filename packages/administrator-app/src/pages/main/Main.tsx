import { Link } from "react-router-dom";
import { Layout } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/Store.context";
import styles from "./Main.module.css";

const Main = () => {
  const { themes, authors } = useStoreContext();

  return (
    <Layout title='Authors and themes'>
      <div className={styles.listsContainer}>
        <div>
          <h2>Themes</h2>
          <h3>
            <Link to={routes.themes.root}>To all themes</Link>
          </h3>
          <ul>
            {themes.map((theme) => (
              <li key={`${theme.title}-${theme.author}`}>
                <Link to={`${routes.themes.root}/${theme.title}`}>
                  {theme.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Authors</h2>
          <h3>
            <Link to={routes.authors.root}>To all authors</Link>
          </h3>
          <ul>
            {authors.map((author) => (
              <li key={author.name}>
                <Link to={`${routes.authors.root}/${author.name}`}>
                  {author.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Main;
