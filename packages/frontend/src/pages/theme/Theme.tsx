import { useParams, Link } from "react-router-dom";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/Store.context";

const Theme = () => {
  const { getThemeByTitle } = useStoreContext();

  const { title } = useParams();
  const theme = getThemeByTitle(title);

  if (!theme) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>{theme.title}</h1>
      <h2>
        <Link to={`${routes.authors.root}/${theme.author}`}>
          {theme.author}
        </Link>
      </h2>
    </div>
  );
};

export default Theme;
