import { useParams, Link } from "react-router-dom";
import { useStoreContext } from "../../context/Store.context";

const Book = () => {
  const { getBookByTitle } = useStoreContext();

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
