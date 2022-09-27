import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <img src='logo' alt='logo' />
      </div>
      <ul>
        <li>Main</li>
      </ul>
      <div>Profile</div>
    </nav>
  );
};

export default Navbar;
