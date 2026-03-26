import { createContext, useContext, useState, type ReactNode } from "react";

type CounterContextType = {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
};

const CoinsContext = createContext<CounterContextType | null>(null);
type Props = {
  children: ReactNode;
};

export function CoinsProvider({ children }: Props) {
  const [coins, setCoins] = useState(1705534);
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
