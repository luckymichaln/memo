import { emojis } from "../../consts/emojis";
import { Card } from "../Card/Card";

import styles from "./Grid.module.scss";

const memoEmojis = [...emojis, ...emojis.reverse()].sort(
  () => Math.random() - 0.5
);

export const Grid = () => {
  const handleCardClick = (emoji: string) => {
    console.log(emoji);
  };

  return (
    <main>
      <section className={styles.grid}>
        {memoEmojis.map((emoji, i) => (
          <Card emoji={emoji} key={emoji + i} onClick={handleCardClick} />
        ))}
      </section>
    </main>
  );
};
