import styles from "./Spinner.module.css";

export interface SpinnerProps {
  fullscreen?: boolean;
}

const SpinnerElement = () => (
  <div className={styles.spinner}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const Spinner = ({ fullscreen }: SpinnerProps) => {
  if (fullscreen) {
    return (
      <div className={styles.fullscreen}>
        <SpinnerElement />
      </div>
    );
  }

  return <SpinnerElement />;
};

export default Spinner;
