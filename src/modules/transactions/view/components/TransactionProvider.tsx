import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/modules/infra/services/apiClient";
import { formatedErrorsArray } from "@/modules/utils/request";
import { Transaction } from "../../domain/Transaction";
import { useBudget } from "../hooks/useBudget";
import { useAuth } from "@/modules/auth";
import { formatDate } from "@/modules/utils/date";

type TransactionProviderValue = {
  createTransaction: any
  updateTransaction: any
  deleteTransaction: any
  transactions: Transaction[]
  setTransactions: any
  refetchTransactions: any
  selectedMonthDate: any,
  setSelectedMonthDate: any,
  payTransaction: any,
  unpayTransaction: any,
  calculateBalance: any,
  calculateTotal: any,
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export const TransactionContext = createContext<TransactionProviderValue | undefined>(
  undefined
);

type TransactionContextProviderProps = {
  children: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionContextProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedMonthDate, setSelectedMonthDate] = useState(new Date())
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  const { selectedBudgetId } = useBudget()

  const fetchTransactions = useCallback(
    () => {
      api
        .get("/transactions", {params: {
          budgetId: selectedBudgetId,
          selectedMonthDate: formatDate(selectedMonthDate),
        }})
        .then((response) => {
          const data = response.data
          setTransactions(data.transactions);
        })
        .catch((err) => {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
        })
        .finally(() => {
          setisLoading(false);
        });
    },[selectedBudgetId, selectedMonthDate])


  const refetchTransactions = useCallback(() => {
    setTimeout(function() {
      fetchTransactions()
    }, 400);
  }, [fetchTransactions]);

  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    setisLoading(true);
    refetchTransactions()
    return () => setErrors([]);
  }, [refetchTransactions, isAuthenticated]);

  const createTransaction = useCallback(
    async ({ dueAt, price, name, kind, transactionType, installmentNumber, }: {dueAt: string, price: number, name: string, kind: string, transactionType:string, installmentNumber: number }) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/transactions", {
            transaction: {
              dueAt,
              price: Number(price),
              name,
              kind,
              transactionType,
              installmentNumber,
              budgetId: selectedBudgetId
            },
          });

          if (response.status === 201) {
            refetchTransactions()

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
      }, [selectedBudgetId, refetchTransactions])

  const updateTransaction = useCallback(
    async ({ id, dueAt, price, name, kind, transactionType, installmentNumber, targetTransactions }: {id: number, dueAt: string, price: number, name: string, kind: string, transactionType:string, installmentNumber: number, targetTransactions:string }) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/transactions/${id}`, {
            transaction: {
              dueAt,
              price: Number(price),
              name,
              kind,
              transactionType,
              installmentNumber,
              budgetId: selectedBudgetId,
              targetTransactions,
            },
          });

          if (response.status === 200) {
            refetchTransactions()

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
      }, [refetchTransactions, selectedBudgetId])

  const deleteTransaction = useCallback(
    async ({ id, targetTransactions }: {id: number, targetTransactions: any}) =>  {
      try {
          setisLoading(true);

          const response = await api.delete(`/transactions/${id}?targetTransactions=${targetTransactions}`);

          if (response.status === 204) {
            refetchTransactions()
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  }, [refetchTransactions])

  const payTransaction = useCallback(
    async (id: number) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/transactions/${id}/pay`, {});

          if (response.status === 200) {
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  },[])

  const unpayTransaction = useCallback(
    async (id: number) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/transactions/${id}/unpay`, {});

          if (response.status === 200) {
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  },[])


  const calculateTotal = useCallback((transactionType: 'expense'|'income') =>
    transactions.reduce((acc, transaction) => {
        if(transaction.transactionType === transactionType){
          return acc + transaction.price
        } else {
          return acc
        }
      },0)
    ,[transactions]
  )

  const calculateBalance = useCallback(() =>
    transactions.reduce((acc, transaction) => {
      if(transaction.status === 'pago'){
          const value = transaction.transactionType === 'income' ? transaction.price : -transaction.price
          return acc + value
        } else {
          return acc
        }
      },0)
    ,[transactions])

  const value = useMemo(
    () => ({
      transactions,
      setTransactions,
      refetchTransactions,
      createTransaction,
      updateTransaction,
      deleteTransaction,
      selectedMonthDate,
      setSelectedMonthDate,
      payTransaction,
      unpayTransaction,
      calculateBalance,
      calculateTotal,
      isLoading,
      errors,
      setErrors,
    }),
    [
      transactions,
      setTransactions,
      refetchTransactions,
      createTransaction,
      updateTransaction,
      deleteTransaction,
      selectedMonthDate,
      setSelectedMonthDate,
      payTransaction,
      unpayTransaction,
      calculateBalance,
      calculateTotal,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
  );
};
