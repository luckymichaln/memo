import styles from "./TimeCounter.module.scss";

type TimeCounterProps = {
  time: string;
};

export const TimeCounter = ({ time }: TimeCounterProps) => {
  return (
    <p className={styles.TimeCounter}>
      Your time: <span className={styles.TimeCounterSeconds}>{time}s</span>
    </p>
  );
};
