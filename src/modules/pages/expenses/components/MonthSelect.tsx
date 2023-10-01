import styles from "./MonthSelect.module.scss";
import { useMonthSelect } from "../hooks/useMonthSelect";
import { Fab } from "@mui/material";

export const MonthSelect: React.FC<any> = () => {
  const { currentMonth, currentYear, setPreviousMonthDate, setNextMonthDate } = useMonthSelect();

  const LeftArrow: React.FC = () => (
    <Fab aria-label="left" className={styles.arrowButton} onClick={setPreviousMonthDate}>
      {'< '}
    </Fab>
  );

  const RightArrow: React.FC = () => (
    <Fab aria-label="left" className={styles.arrowButton} onClick={setNextMonthDate}>
      {'> '}
    </Fab>
  );

  return (
    <div className={styles.monthSelectContent} style={{ textAlign: 'center' }}>
      <LeftArrow />
      <span>{`${currentMonth} / ${currentYear}`}</span>
      <RightArrow />
    </div>
  );
};

