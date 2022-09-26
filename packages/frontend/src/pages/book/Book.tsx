import { useParams, Link } from "react-router-dom";
import { useBooksContext } from "../../context/Books.context";

const Book = () => {
  const { getBookByTitle } = useBooksContext();
  const { title } = useParams();
  const book = getBookByTitle(title);

  if (!book) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>
        <Link to={book.author}>{book.author}</Link>
      </h2>
    </div>
  );
};

export default Book;
