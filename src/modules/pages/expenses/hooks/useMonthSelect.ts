import { capitalize } from '@/lib/utils/string';
import { useExpense } from '@/modules/expenses';

export const useMonthSelect = () => {
  const { selectedMonthDate, setSelectedMonthDate } = useExpense()
  const currentYear = selectedMonthDate.getFullYear();

  const currentMonthText = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
  }).format(selectedMonthDate);

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
    currentMonth: capitalize(currentMonthText),
    currentYear,
  };
};
