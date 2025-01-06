import { useState } from "react";
import { emojisList, ANIMATION_DELAY_MS } from "../constans/constans";

const deafultEmojisState = emojisList.map((emoji) => ({
  icon: emoji,
  isClicked: false,
  isMatched: false,
}));
const defaultFirstClickedEmoji = {
  icon: "",
  index: -1,
};
const shuffledEmojis = () => deafultEmojisState.sort(() => Math.random() - 0.5);

export const useEmojis = () => {
  const [clicksCount, setClicksCount] = useState(0);
  const [emojisState, setEmojisState] = useState(() => shuffledEmojis());
  const [pairsMatched, setPairsMatched] = useState(0);
  const [firstClickedEmoji, setFirstClickedEmoji] = useState(
    defaultFirstClickedEmoji
  );

  const triesCount = Math.floor(clicksCount / 2); // amount of tries to match pairs
  const isGameFinished = pairsMatched === emojisList.length / 2;

  const handleEmojiClick = (emoji: string, index: number) => {
    setClicksCount((prev) => prev + 1);
    setFirstClickedEmoji({ icon: emoji, index: index });

    // Flips every clicked card
    setEmojisState((prev) => {
      const updatedEmojis = [...prev];
      updatedEmojis[index] = { ...updatedEmojis[index], isClicked: true };
      return updatedEmojis;
    });

    // Updates matched cards
    if (firstClickedEmoji.icon === emoji) {
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

      // Updates matched pairs and waits for last flips
      setTimeout(() => {
        setPairsMatched((prev) => prev + 1);
      }, ANIMATION_DELAY_MS * 2.1);
    }

    // Runs every second click and removes clicked state
    if (clicksCount % 2 !== 0) {
      setTimeout(() => {
        setEmojisState((prev) => {
          const updatedEmojis = prev.map((emoji) => ({
            ...emoji,
            isClicked: false,
          }));
          return updatedEmojis;
        });
      }, ANIMATION_DELAY_MS);

      setFirstClickedEmoji(defaultFirstClickedEmoji);
    }
  };

  const handleResetEmojiState = () => {
    setEmojisState(shuffledEmojis());
    setFirstClickedEmoji(defaultFirstClickedEmoji);
    setClicksCount(0);
    setPairsMatched(0);
  };

  return {
    emojisState,
    triesCount,
    isGameFinished,
    handleEmojiClick,
    handleResetEmojiState,
  };
};
