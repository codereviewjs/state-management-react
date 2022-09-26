import styles from "./Books.module.css";
import BooksContextProvider, {
  useBooksContext,
} from "../../context/Books.context";
import BookCard from "./components/BookCard/BookCard";

const Books = () => {
  const { books } = useBooksContext();
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
