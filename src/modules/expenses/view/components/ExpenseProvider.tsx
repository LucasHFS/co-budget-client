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
import { Expense } from "../../domain/Expense";
import { useBudget } from "../hooks/useBudget";
import { useAuth } from "@/modules/auth";
import { formatDate } from "@/modules/utils/date";


type ExpenseProviderValue = {
  createExpense: any
  updateExpense: any
  deleteExpense: any
  expenses: Expense[]
  setExpenses: any
  refetchExpenses: any
  selectedMonthDate: any,
  setSelectedMonthDate: any,
  payExpense: any,
  unpayExpense: any,
  calculateTotalPayable: any
  calculateBalanceToPay: any
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export const ExpenseContext = createContext<ExpenseProviderValue | undefined>(
  undefined
);

type ExpenseContextProviderProps = {
  children: ReactNode;
};

export const ExpenseProvider = ({ children }: ExpenseContextProviderProps) => {
  const [expenses, setExpenses] = useState([])
  const [selectedMonthDate, setSelectedMonthDate] = useState(new Date())
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  const { selectedBudgetId } = useBudget()

  const fetchExpenses = useCallback(
    () => {
      api
        .get("/expenses", {params: {
          budgetId: selectedBudgetId,
          selectedMonthDate: formatDate(selectedMonthDate),
        }})
        .then((response) => {
          const data = response.data
          setExpenses(data.expenses);
        })
        .catch((err) => {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
        })
        .finally(() => {
          setisLoading(false);
        });
    },[selectedBudgetId, selectedMonthDate])


  const refetchExpenses = useCallback(() => {
    setTimeout(function() {
      fetchExpenses()
    }, 400);
  }, [fetchExpenses]);

  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    setisLoading(true);
    refetchExpenses()
    return () => setErrors([]);
  }, [refetchExpenses, isAuthenticated]);

  const createExpense = useCallback(
    async ({ dueAt, price, name, kind, installmentNumber, }: {dueAt: string, price: number, name: string, kind: string, installmentNumber: number }) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/expenses", {
            expense: {
              dueAt,
              price: Number(price),
              name,
              kind,
              installmentNumber,
              budgetId: selectedBudgetId
            },
          });

          if (response.status === 201) {
            refetchExpenses()

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
      }, [selectedBudgetId, refetchExpenses])

  const updateExpense = useCallback(
    async ({ id, dueAt, price, name, kind, installmentNumber, }: {id: number, dueAt: string, price: number, name: string, kind: string, installmentNumber: number }) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/expenses/${id}`, {
            expense: {
              dueAt,
              price: Number(price),
              name,
              kind,
              installmentNumber,
              budgetId: selectedBudgetId
            },
          });

          if (response.status === 200) {
            refetchExpenses()

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
      }, [refetchExpenses])

  const deleteExpense = useCallback(
    async ({ id }: {id: number}) =>  {
      try {
          setisLoading(true);

          const response = await api.delete(`/expenses/${id}`);

          if (response.status === 204) {
            refetchExpenses()
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  }, [refetchExpenses])

  const payExpense = useCallback(
    async (id: number) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/expenses/${id}/pay`, {});

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

  const unpayExpense = useCallback(
    async (id: number) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/expenses/${id}/unpay`, {});

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

  const calculateTotalPayable = useCallback(() =>
    expenses.reduce((acc, expense) => (acc + expense.price), 0)
  , [expenses])

  const calculateBalanceToPay = useCallback(() =>
    expenses.reduce((acc, expense) => {
        if(expense.status === 'Pago'){
          return acc
        } else {
          return acc + expense.price
        }
      },0)
    ,[expenses])

  const value = useMemo(
    () => ({
      expenses,
      setExpenses,
      refetchExpenses,
      createExpense,
      updateExpense,
      deleteExpense,
      selectedMonthDate,
      setSelectedMonthDate,
      payExpense,
      unpayExpense,
      calculateTotalPayable,
      calculateBalanceToPay,
      isLoading,
      errors,
      setErrors,
    }),
    [
      expenses,
      setExpenses,
      refetchExpenses,
      createExpense,
      updateExpense,
      deleteExpense,
      selectedMonthDate,
      setSelectedMonthDate,
      payExpense,
      unpayExpense,
      calculateTotalPayable,
      calculateBalanceToPay,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
