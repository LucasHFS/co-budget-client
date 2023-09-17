import Link from "next/link"
import styles from "../Expense.module.scss";
import { useExpense } from "@/modules/expenses";

export const MonthSelect = () => {

  const { selectedMonthDate, setSelectedMonthDate } = useExpense()
  const currentMonth = selectedMonthDate.getMonth() + 1
  const currentYear = selectedMonthDate.getFullYear()

  const setPreviousMonthDate = () => {
    const newDate = new Date(selectedMonthDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setSelectedMonthDate(newDate)
  }

  const setNextMonthDate = () => {
    const newDate = new Date(selectedMonthDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setSelectedMonthDate(newDate)
  }

  const LeftArrow = () => (<span style={{cursor: 'pointer'}} onClick={setPreviousMonthDate}>{ '< ' }</span>)
  const RightArrow = () => (<span style={{cursor: 'pointer'}} onClick={setNextMonthDate}>{ ' >' }</span>)

  return (
    <div className={styles.content} style={{textAlign: 'center'}}>
      <LeftArrow />
      <span>{`${currentMonth}/${currentYear}`}</span>
      <RightArrow />
    </div>
  )

}
