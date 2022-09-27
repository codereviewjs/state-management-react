import { useStoreContext } from "../../context/Store.context";
import styles from "./Books.module.css";
import BookCard from "./components/BookCard/BookCard";

const Books = () => {
  const { books } = useStoreContext();
  return (
    <div>
      <h1>Books</h1>
      <div className={styles.books}>
        {books.map((book) => (
          <BookCard book={book} key={book.title + book.author} />
        ))}
      </div>
    </div>
  );
};

export default Books;
