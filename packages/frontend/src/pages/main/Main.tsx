import { Link } from "react-router-dom";
import { routes } from "../../constants/routes.constants";
import { useAuthorsContext } from "../../context/Authors.context";
import { useBooksContext } from "../../context/Books.context";
import styles from "./Main.module.css";

const Main = () => {
  const { books } = useBooksContext();
  const { authors } = useAuthorsContext();

  return (
    <div>
      <h1>Authors and books</h1>
      <div className={styles.listsContainer}>
        <div>
          <h2>Books</h2>
          <h3>
            <Link to={routes.books.root}>To all books</Link>
          </h3>
          <ul>
            {books.map((book) => (
              <li key={book.title + book.author}>
                <Link to={`${routes.books.root}/${book.title}`}>
                  {book.title}
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
    </div>
  );
};

export default Main;
