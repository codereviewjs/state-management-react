import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { Button } from "ui";
import styles from "./Navbar.module.css";
import { Roles } from "types";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <Link to={routes.main.root}>
          <img src={Logo} alt='logo' />
        </Link>
      </div>

      {user.isLoggedIn && (
        <div className={styles.actions}>
          {user.data?.role === Roles.REPORTER ? (
            <Link to={routes.reports.reportCreate}>
              <Button type='button' variant='primary'>
                Create report
              </Button>
            </Link>
          ) : (
            <Link to={routes.reports.reportCreate}>
              <Button type='button' variant='primary'>
                Add reporter
              </Button>
            </Link>
          )}
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
