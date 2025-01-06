import { useEmojis } from "../../hooks/useEmojis";
import { Congrats } from "../Congrats/Congrats";
import { Grid } from "../Grid/Grid";
import { TriesCounter } from "../TriesCounter/TriesCounter";

export const Game = () => {
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
          <TriesCounter count={triesCount} />
          <Grid data={emojisState} onClick={handleEmojiClick} />
        </>
      ) : (
        <Congrats triesCount={triesCount} onClick={handleResetEmojiState} />
      )}
    </main>
  );
};
