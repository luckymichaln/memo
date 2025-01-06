import styles from "./Congrats.module.scss";

type CongratsProps = {
  time: string;
  onClick: () => void;
};

export const Congrats = ({ time, onClick }: CongratsProps) => {
  return (
    <div className={styles.CongratsBox}>
      <h2 className={styles.CongratsBoxHeading}>Congrats! 🎊</h2>
      <p>
        You did it in <span className={styles.CongratsBoxTime}>{time}</span>{" "}
        seconds 👏
      </p>
      <p>Now... try to beat that record 😎</p>
      <button onClick={onClick} className={styles.CongratsBoxButton}>
        Play again
      </button>
    </div>
  );
};
