import { useExpense } from '@/modules/expenses';

export const useMonthSelect = () => {
  const { selectedMonthDate, setSelectedMonthDate } = useExpense()
  const currentMonth = selectedMonthDate.getMonth() + 1;
  const currentYear = selectedMonthDate.getFullYear();

  const setPreviousMonthDate = () => {
    const newDate = new Date(selectedMonthDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedMonthDate(newDate);
  };

  const setNextMonthDate = () => {
    const newDate = new Date(selectedMonthDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedMonthDate(newDate);
  };

  return {
    selectedMonthDate,
    setPreviousMonthDate,
    setNextMonthDate,
    currentMonth,
    currentYear,
  };
};
