import {Button} from "ui";
import styles from "./Navbar.module.css";
import { routes } from "../../constants/routes.constants";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <Link href={routes.main.root}>
          <Image src='/logo.svg' width={130} height={30} alt='logo' />
        </Link>
      </div>
      <div>
        <ul className={styles.links}>
          <li>
            <Link href={routes.reporters.root}>Reporters</Link>
          </li>
          <li>
            <Link href={routes.main.root}>Reports</Link>
          </li>
          <li>
            <Link href={routes.reports.root}>Favorites</Link>
          </li>
        </ul>
      </div>
      <div className={styles.actions}>
        <Button type='button' outline variant='primary'>
          Logout
        </Button>
        <div className={styles.profile} />
      </div>
    </nav>
  );
};

export default Navbar;
