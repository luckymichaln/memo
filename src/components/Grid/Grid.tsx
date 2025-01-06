import { useState } from "react";
import { emojis } from "../../constans/emojis";
import { Card } from "../Card/Card";

import styles from "./Grid.module.scss";

const ANIMATION_DELAY_MS = 600;
const emojisFullList = [...emojis, ...emojis.reverse()];
const deafultEmojisState = emojisFullList.map((emoji) => ({
  icon: emoji,
  isClicked: false,
  isMatched: false,
}));
const defaultFirstClickedEmoji = {
  icon: "",
  index: -1,
};
const shuffledEmojis = () => deafultEmojisState.sort(() => Math.random() - 0.5);

export const Grid = () => {
  const [emojisState, setEmojisState] = useState(() => shuffledEmojis());
  const [pairsClicksCount, setPairsClicksCount] = useState(0);
  const [pairsMatched, setPairsMatched] = useState(0);
  const [triesCount, setTriesCount] = useState(0);
  const [firstClickedEmoji, setFirstClickedEmoji] = useState(
    defaultFirstClickedEmoji
  );

  const isClickPossible = pairsClicksCount < 2;
  const isCongratsVisible = pairsMatched === emojisFullList.length / 2;

  const handleCardClick = (emoji: string, index: number) => {
    if (!isClickPossible) return;

    setPairsClicksCount((prev) => prev + 1);
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
      }, ANIMATION_DELAY_MS);

      setTimeout(() => {
        setPairsMatched((prev) => prev + 1);
      }, ANIMATION_DELAY_MS * 2);

      setPairsClicksCount(0);
    }

    if (pairsClicksCount === 1) {
      setTimeout(() => {
        setEmojisState((prev) => {
          const updatedEmojis = prev.map((emoji) => ({
            ...emoji,
            isClicked: false,
          }));
          return updatedEmojis;
        });
        setPairsClicksCount(0);
      }, ANIMATION_DELAY_MS);
      setTriesCount((prev) => prev + 1);
      setFirstClickedEmoji({ icon: "", index: -1 });
    }
  };

  const handleResetGame = () => {
    setEmojisState(shuffledEmojis());
    setFirstClickedEmoji(defaultFirstClickedEmoji);
    setTriesCount(0);
    setPairsMatched(0);
    setPairsClicksCount(0);
  };

  return (
    <main>
      {!isCongratsVisible ? <p>Your tries: {triesCount}</p> : null}
      {!isCongratsVisible ? (
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
      ) : (
        <div className="CongratsBox">
          <h2 style={{ marginBottom: "48px" }}>Congrats! 🎊</h2>
          <p>You did it in {triesCount} tries 👏</p>
          <p>Now... try to beat that record 😎</p>
          <button onClick={handleResetGame} style={{ marginTop: "48px" }}>
            Play again
          </button>
        </div>
      )}
    </main>
  );
};
