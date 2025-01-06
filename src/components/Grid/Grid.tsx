import { useEmojis } from "../../hooks/useEmojis";
import { Card } from "../Card/Card";

import styles from "./Grid.module.scss";

export const Grid = () => {
  const {
    emojisState,
    triesCount,
    isGameFinished,
    handleEmojiClick,
    handleResetEmojiState,
  } = useEmojis();

  return (
    <main>
      {!isGameFinished ? (
        <>
          <p>Your tries: {triesCount}</p>
          <section className={styles.grid}>
            {emojisState.map((emoji, i) => {
              const { icon, isClicked, isMatched } = emoji;
              return (
                <Card
                  key={icon + i}
                  emoji={icon}
                  index={i}
                  onClick={handleEmojiClick}
                  isClicked={isClicked}
                  isMatched={isMatched}
                />
              );
            })}
          </section>
        </>
      ) : (
        <div className="CongratsBox">
          <h2 style={{ marginBottom: "48px" }}>Congrats! 🎊</h2>
          <p>You did it in {triesCount} tries 👏</p>
          <p>Now... try to beat that record 😎</p>
          <button onClick={handleResetEmojiState} style={{ marginTop: "48px" }}>
            Play again
          </button>
        </div>
      )}
    </main>
  );
};
