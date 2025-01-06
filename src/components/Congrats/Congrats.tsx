import styles from "./Congrats.module.scss";

type CongratsProps = {
  triesCount: number;
  onClick: () => void;
};

export const Congrats = ({ triesCount, onClick }: CongratsProps) => {
  return (
    <div className={styles.CongratsBox}>
      <h2 className={styles.CongratsBoxHeading}>Congrats! 🎊</h2>
      <p>You did it in {triesCount} tries 👏</p>
      <p>Now... try to beat that record 😎</p>
      <button onClick={onClick} className={styles.CongratsBoxButton}>
        Play again
      </button>
    </div>
  );
};
