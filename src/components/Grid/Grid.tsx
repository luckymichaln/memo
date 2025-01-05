import { useState } from "react";
import { emojis } from "../../consts/emojis";
import { Card } from "../Card/Card";

import styles from "./Grid.module.scss";

const emojisFullList = [...emojis, ...emojis.reverse()];
const emojisDeafultState = emojisFullList.map((emoji) => ({
  icon: emoji,
  isClicked: false,
  isMatched: false,
}));
const shuffledEmojis = emojisDeafultState.sort(() => Math.random() - 0.5);

export const Grid = () => {
  const [emojisState, setEmojisState] = useState(() => shuffledEmojis);
  const [clicksCount, setClicksCount] = useState(0);
  const [firstClickedEmoji, setFirstClickedEmoji] = useState({
    icon: "",
    index: -1,
  });

  const isClickPossible = clicksCount < 2;

  const handleCardClick = (emoji: string, index: number) => {
    if (!isClickPossible) return;

    setClicksCount((prev) => prev + 1);
    setFirstClickedEmoji({ icon: emoji, index: index });

    setEmojisState((prev) => {
      const updatedEmojis = [...prev];
      updatedEmojis[index] = { ...updatedEmojis[index], isClicked: true };
      return updatedEmojis;
    });

    if (
      firstClickedEmoji.icon === emoji &&
      firstClickedEmoji.index !== index &&
      isClickPossible
    ) {
      setTimeout(() => {
        setEmojisState((prev) => {
          const updatedEmojis = [...prev];
          updatedEmojis[index] = { ...updatedEmojis[index], isMatched: true };
          updatedEmojis[firstClickedEmoji.index] = {
            ...updatedEmojis[firstClickedEmoji.index],
            isMatched: true,
          };
          return updatedEmojis;
        });
        setFirstClickedEmoji({ icon: "", index: -1 });
      }, 600);
      setClicksCount(0);
    }

    if (clicksCount === 1) {
      setTimeout(() => {
        setEmojisState((prev) => {
          const updatedEmojis = prev.map((emoji) => ({
            ...emoji,
            isClicked: false,
          }));
          return updatedEmojis;
        });
        setClicksCount(0);
      }, 600);
      setFirstClickedEmoji({ icon: "", index: -1 });
    }
  };

  return (
    <main>
      <section className={styles.grid}>
        {emojisState.map((emoji, i) => {
          const { icon, isClicked, isMatched } = emoji;
          return (
            <Card
              key={icon + i}
              emoji={icon}
              index={i}
              onClick={handleCardClick}
              isClicked={isClicked}
              isMatched={isMatched}
            />
          );
        })}
      </section>
    </main>
  );
};
