import { useEmojis } from "../../hooks/useEmojis";
import { Congrats } from "../Congrats/Congrats";
import { Grid } from "../Grid/Grid";
import { TimeCounter } from "../TimeCounter/TimeCounter";

export const Game = () => {
  const {
    emojisState,
    gameTime,
    isGameFinished,
    handleEmojiClick,
    handleResetEmojiState,
  } = useEmojis();

  return (
    <main>
      {!isGameFinished ? (
        <>
          <TimeCounter time={gameTime} />
          <Grid data={emojisState} onClick={handleEmojiClick} />
        </>
      ) : (
        <Congrats time={gameTime} onClick={handleResetEmojiState} />
      )}
    </main>
  );
};
