import { IBook } from "types";
import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

interface Props {
  book: IBook;
}

const BookCard = ({ book }: Props) => {
  return (
    <div className={styles.card} key={book.title}>
      <div className={styles.cardHeader}>
        <Link className={styles.bookTitle} to={`/books/${book.title}`}>
          {book.title}
        </Link>
        <Link className='author' to={`/author/${book.author}`}>
          {book.author}
        </Link>
      </div>
      <ul className={styles.cardBody}>
        <li>
          <span>Country</span> <span>{book.country}</span>
        </li>
        <li>
          <span>Year</span> <span>{book.year}</span>
        </li>
        <li>
          <span>Pages</span> <span>{book.pages}</span>
        </li>
        <li>
          <span>Language</span> <span>{book.language}</span>
        </li>
      </ul>
      <div className={styles.cardFooter}>
        <a href={book.link}>read more</a>
      </div>
    </div>
  );
};

export default BookCard;
