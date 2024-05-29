import { NumericFormat } from "react-number-format"
import styles from "./TotalValues.module.scss";
import cx from "classnames";
import { Transaction } from "@sentry/nextjs/types/client";
import { useCalculateTotals } from "./hooks/useCalculateTotals";

export const TotalValues = ({transactions}: { transactions: Transaction[]}) => {
  const { calculateBalance, calculateTotal, calculateLastingExpenses } = useCalculateTotals({transactions})
  const balance = calculateBalance()
  const grossExpenses = calculateTotal('expense')
  const grossIncomes = calculateTotal('income')
  const expectedBalance = grossIncomes - grossExpenses
  const lastingExpenses = calculateLastingExpenses()

  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '30px', justifyContent: 'center'}}>
      <div className={styles.container}>
        <div>
          <span>Saldo previsto: </span>
          <NumericFormat
              className={cx(
                {
                  [styles.positive]: expectedBalance > 0,
                  [styles.negative]: expectedBalance < 0,
                }
              )}
              prefix="R$  "
              displayType="text"
              //@ts-ignore
              value={parseFloat(expectedBalance).toFixed(2)}
            />
        </div>
        <div>
          <span>Saldo atual: </span>
          <NumericFormat
              className={cx(
                {
                  [styles.positive]: balance > 0,
                  [styles.negative]: balance < 0,
                }
              )}
              prefix="R$  "
              displayType="text"
              //@ts-ignore
              value={parseFloat(balance).toFixed(2)}
            />
        </div>

        <div style={{color: 'red'}}>
          <span>Total de gastos: </span>
          <NumericFormat
              prefix="R$  "
              displayType="text"
              //@ts-ignore
              value={parseFloat(grossExpenses).toFixed(2)}
            />
        </div>

        <div style={{color: 'red'}}>
          <span>Gastos Pendentes: </span>
          <NumericFormat
              prefix="R$  "
              displayType="text"
              //@ts-ignore
              value={parseFloat(lastingExpenses).toFixed(2)}
            />
        </div>
      </div>
    </div>
  )
}
