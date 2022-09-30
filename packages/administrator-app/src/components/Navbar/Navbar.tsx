import { Link } from "react-router-dom";
import { routes } from "../../constants/routes.constants";
import styles from "./Navbar.module.css";

const Navbar = () => {
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
          <Link to={routes.reports.root}>Themes</Link>
        </li>
        <li>
          <Link to={routes.reporters.root}>Authors</Link>
        </li>
      </ul>
      <div className={styles.profile} />
    </nav>
  );
};

export default Navbar;
