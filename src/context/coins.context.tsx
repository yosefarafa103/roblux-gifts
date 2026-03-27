import { createContext, useContext, useState, type ReactNode } from "react";

type CounterContextType = {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
};

const CoinsContext = createContext<CounterContextType | null>(null);
type Props = {
  children: ReactNode;
};

function randomBetween(min: number, max: number): number {
  if (min > max) throw new Error("min must be <= max");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function CoinsProvider({ children }: Props) {
  const [coins, setCoins] = useState(() => randomBetween(2_000_000, 5_000_000));
  return (
    <CoinsContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  );
}

export function useCoins() {
  const context = useContext(CoinsContext);

  if (!context) {
    throw new Error("useCoins must be used inside CoinsProvider");
  }

  return context;
}
