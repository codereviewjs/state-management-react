import { Link } from "react-router-dom";
import { Button } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/store/Store.context";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout, isLoggedIn } = useStoreContext();
  return (
    <nav className={styles.nav}>
      <div>
        <img src='logo' alt='logo' />
      </div>
      <ul className={styles.links}>
        <li>
          <Link to={routes.main.root}>Main</Link>
        </li>
        <li>
          <Link to={routes.reports.root}>Reports</Link>
        </li>
      </ul>
      {isLoggedIn && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "130px",
          }}
        >
          <Button type='button' outline variant='primary' onClick={logout}>
            Logout
          </Button>
          <div className={styles.profile} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
