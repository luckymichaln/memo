import clsx from "clsx";

import styles from "./Card.module.scss";

type CardProps = {
  emoji: string;
  index: number;
  onClick: (emoji: string, index: number) => void;
  isClicked: boolean;
  isMatched: boolean;
};

export const Card = ({
  emoji,
  index,
  onClick,
  isClicked,
  isMatched,
}: CardProps) => {
  const cardClass = clsx(styles.Card, {
    [styles.CardMatched]: isMatched,
    [styles.CardClicked]: isClicked,
  });

  const cardReverseClass = clsx(styles.cardFace, styles.CardReverse, {
    [styles.CardFaceMatched]: isMatched,
  });

  return (
    <div className={cardClass} onClick={() => onClick(emoji, index)}>
      <span className={clsx(styles.CardFace, styles.CardFront)}>{emoji}</span>

      <span className={cardReverseClass}>{isMatched ? "🎉" : "❔"}</span>
    </div>
  );
};
