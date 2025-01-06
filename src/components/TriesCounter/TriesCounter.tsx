type TriesCounterProps = {
  count: number;
};

export const TriesCounter = ({ count }: TriesCounterProps) => {
  return <p>Your tries: {count}</p>;
};
