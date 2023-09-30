import styles from "../Expense.module.scss";
import { useMonthSelect } from "../hooks/useMonthSelect";

export const MonthSelect: React.FC<any> = () => {
  const { currentMonth, currentYear, setPreviousMonthDate, setNextMonthDate } = useMonthSelect();

  const LeftArrow: React.FC = () => (
    <span style={{ cursor: 'pointer' }} onClick={setPreviousMonthDate}>
      {'< '}
    </span>
  );

  const RightArrow: React.FC = () => (
    <span style={{ cursor: 'pointer' }} onClick={setNextMonthDate}>
      {' >'}
    </span>
  );

  return (
    <div className={styles.monthSelectContent} style={{ textAlign: 'center' }}>
      <LeftArrow />
      <span>{`${currentMonth}/${currentYear}`}</span>
      <RightArrow />
    </div>
  );
};

