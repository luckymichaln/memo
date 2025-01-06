import { EmojiState } from "../../hooks/useEmojis";
import { Card } from "../Card/Card";
import styles from "./Grid.module.scss";

type GridProps = {
  data: EmojiState[];
  onClick: (emoji: string, index: number) => void;
};

export const Grid = ({ data, onClick }: GridProps) => {
  return (
    <section className={styles.Grid}>
      {data.map((emoji, i) => {
        const { icon, isClicked, isMatched } = emoji;
        return (
          <Card
            key={icon + i}
            emoji={icon}
            index={i}
            onClick={onClick}
            isClicked={isClicked}
            isMatched={isMatched}
          />
        );
      })}
    </section>
  );
};
