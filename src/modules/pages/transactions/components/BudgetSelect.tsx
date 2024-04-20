import { Fab, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useBudget } from "@/modules/transactions";
import styles from "../Transaction.module.scss";
import EditIcon from '@mui/icons-material/Edit';
import Router from 'next/router'
import useFetchBudgets from "@/modules/transactions/view/hooks/useFetchBudgets";
import { Budget } from "@/modules/transactions/domain/Budget";

export const BudgetSelect = ({}) =>{
  const { selectedBudgetId, setSelectedBudgetId } = useBudget()
  const { budgets }: { budgets: Budget[]} = useFetchBudgets()

  const redirectToEvents = () => {
    Router.push('/budgets')
  }

  return (
    <FormControl>
      <div className={styles.eventSelectContainer}>
        <InputLabel
          id={`budget-label`}
          sx={{ color: '#e0e0e2' }}
        >
          Orçamento
        </InputLabel>
        <Select
          labelId={`budget-label`}
          name={`budget`}
          id={`budget`}
          value={selectedBudgetId}
          label="Orçamento"
          required
          onChange={(e) => {
            setSelectedBudgetId(e.target.value);
          }}
          sx={{ minWidth: '200px', color: '#e0e0e2' }}
        >
          {budgets.map((budget) => (
            <MenuItem key={`${budget.name}`} value={budget.id} className={styles.menuItem}>{budget.name}</MenuItem>
          ))}
        </Select>

        {/* @ts-ignore */}
        <Fab aria-label="add" color="white" onClick={redirectToEvents}>
          {/* @ts-ignore */}
          <EditIcon color="black"/>
        </Fab>
      </div>
    </FormControl>
  )
}
