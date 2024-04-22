import {
  createContext,
  ReactNode,
  useState,
} from "react";

type TransactionProviderValue = {
  selectedMonthDate: any,
  setSelectedMonthDate: any,
};

export const TransactionContext = createContext<TransactionProviderValue | undefined>(
  undefined
);

type TransactionContextProviderProps = {
  children: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionContextProviderProps) => {
  const [selectedMonthDate, setSelectedMonthDate] = useState(new Date())

  const value = {
    selectedMonthDate,
    setSelectedMonthDate,
  }

  return (
    //@ts-ignore
    <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
  );
};
