import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { Button } from "ui";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/store/Store.context";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout, isLoggedIn } = useStoreContext();
  return (
    <nav className={styles.nav}>
      <div>
        <Link to={routes.main.root}>
          <img src={Logo} alt='logo' />
        </Link>
      </div>

      {isLoggedIn && (
        <div className={styles.actions}>
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
