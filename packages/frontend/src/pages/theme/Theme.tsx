import { useParams, Link } from "react-router-dom";
import { Layout } from "../../components";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/Store.context";

const Theme = () => {
  const { getThemeByTitle } = useStoreContext();

  const { title } = useParams();
  const theme = getThemeByTitle(title);

  if (!theme) {
    return <div>Theme not found</div>;
  }

  return (
    <Layout title={theme.title}>
      <h2>
        <Link to={`${routes.authors.root}/${theme.author}`}>
          {theme.author}
        </Link>
      </h2>
    </Layout>
  );
};

export default Theme;
