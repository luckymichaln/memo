import styles from "./Heading.module.scss";

export const Heading = () => {
  return (
    <header className={styles.heading}>
      <h1>Memo!</h1>
      <p>Collect the pairs of emojis and have fun!</p>
    </header>
  );
};
