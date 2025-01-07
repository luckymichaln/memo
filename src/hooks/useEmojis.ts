import { useEffect, useRef, useState } from "react";
import {
  emojis,
  ANIMATION_DELAY_MS,
  FIRST_SHOW_DELAY_MS,
} from "../constans/constans";

export type EmojiState = {
  icon: string;
  isClicked: boolean;
  isMatched: boolean;
};

const emojisList = [...emojis, ...emojis.reverse()];
const deafultEmojisState = emojisList.map(
  (emoji): EmojiState => ({
    icon: emoji,
    isClicked: true,
    isMatched: false,
  })
);

const defaultFirstClickedEmoji = {
  icon: "",
  index: -1,
};
const shuffledEmojis = () => deafultEmojisState.sort(() => Math.random() - 0.5);

export const useEmojis = () => {
  const timeoutId = useRef<number | null>(null);
  const intervalId = useRef<number | null>(null);

  const [clicksCount, setClicksCount] = useState(0);
  const [emojisState, setEmojisState] = useState(() => shuffledEmojis());
  const [pairsMatched, setPairsMatched] = useState(0);
  const [gameTime, setGameTime] = useState("0");
  const [firstClickedEmoji, setFirstClickedEmoji] = useState(
    defaultFirstClickedEmoji
  );

  const isGameFinished = pairsMatched === emojisList.length / 2; // All the pairs are matched

  const timer = () => {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const seconds = Math.floor(elapsedTime / 1000);
      const milliseconds = Math.floor((elapsedTime % 1000) / 100); // Get two-digit milliseconds

      setGameTime(`${seconds},${milliseconds}`);
    }, 100);

    return intervalId;
  };

  // Show cards for 1 second before each game and start timer
  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      if (!isGameFinished) {
        setEmojisState((prev) =>
          [...prev].map((emoji) => ({
            ...emoji,
            isClicked: false,
          }))
        );

        // Start the interval after the timeout
        intervalId.current = timer();
      }
    }, FIRST_SHOW_DELAY_MS);

    // Cleanup function to clear both timeout and interval
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [setEmojisState, isGameFinished]);

  const handleEmojiClick = (emoji: string, index: number) => {
    setClicksCount((prev) => prev + 1);
    setFirstClickedEmoji({ icon: emoji, index: index });

    // Flips every card by adding clicked state
    setEmojisState((prev) => {
      const updatedEmojis = [...prev];
      updatedEmojis[index] = { ...updatedEmojis[index], isClicked: true };
      return updatedEmojis;
    });

    // Updates matched cards
    if (firstClickedEmoji.icon === emoji && firstClickedEmoji.index !== index) {
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

    // Removes clicked state on every second click
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
    setGameTime("0");
  };

  return {
    gameTime,
    emojisState,
    isGameFinished,
    handleEmojiClick,
    handleResetEmojiState,
  };
};
