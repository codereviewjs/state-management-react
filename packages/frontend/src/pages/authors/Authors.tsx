import { Layout } from "../../components";
import { useStoreContext } from "../../context/Store.context";

const Authors = () => {
  const { authors, getAuthorByName } = useStoreContext();

  return (
    <Layout title='Authors'>
      <div>
        {authors.map((author) => {
          return <div key={author.name}></div>;
        })}
      </div>
    </Layout>
  );
};

export default Authors;
