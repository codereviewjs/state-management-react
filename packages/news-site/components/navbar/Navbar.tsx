import { Button } from "ui";
import styles from "./Navbar.module.css";
import { routes } from "../../constants/routes.constants";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      <Link href={routes.main.root}>
        <Image src='/logo.svg' width={130} height={35} alt='logo' />
      </Link>
      <div>
        <ul className={styles.links}>
          <li>
            <Link href={routes.reporters.root}>Reporters</Link>
          </li>
          <li>
            <Link href={routes.main.root}>Reports</Link>
          </li>
          {session?.user && (
            <li>
              <Link href={routes.favorites.root}>Favorites</Link>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.actions}>
        {session?.user ? (
          <Button
            onClick={() => signOut()}
            type='button'
            outline
            variant='primary'
          >
            Logout
          </Button>
        ) : (
          <Link href={routes.login.root} passHref>
            <Button type='button' variant='primary'>
              Login
            </Button>
          </Link>
        )}
        <div className={styles.profile}>
          {session?.user?.email?.[0]?.toUpperCase()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
