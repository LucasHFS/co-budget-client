import { Fab } from "@mui/material";
import styles from "./BudgetBox.module.scss";
import { useBudgetBox } from "../hooks/useBudgetBox";
import EditIcon from '@mui/icons-material/Edit';
import { EditBudgetModal } from "./EditBudgetModal";

export const BudgetBox = ({budget}: any) => {
  const { open, handleClickOpen, handleClose, handleSelectedBudgetId, handleUpdate, handleExclude } = useBudgetBox()

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}} className={styles.box} data-testid="budgetBox">
        <div style={{flex: 3}} onClick={() => handleSelectedBudgetId(budget.id)}>
          <div className={styles.title}>#{budget.id}</div>
          <div className={styles.title} data-testid="budgetTitle">{budget.name}</div>
        </div>

        <div style={{ flex: 1}}>
          <Fab aria-label="edit" onClick={handleClickOpen} data-testid="editBudgetBtn">
            {/* @ts-ignore */}
            <EditIcon className={styles.editIcon}/>
          </Fab>
        </div>
      </div>

      <EditBudgetModal
        budget={budget}
        open={open}
        onClose={handleClose}
        handleUpdate={handleUpdate}
        handleExclude={handleExclude}
      />
    </>
  );
}
