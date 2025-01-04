import styles from "./Card.module.scss";

type CardProps = {
  emoji: string;
  onClick: (emoji: string) => void;
};

export const Card = ({ emoji, onClick }: CardProps) => {
  return (
    <div className={styles.card}>
      <span
        className="card__face card__face--front"
        onClick={() => onClick(emoji)}
      >
        {emoji}
      </span>
    </div>
  );
};
