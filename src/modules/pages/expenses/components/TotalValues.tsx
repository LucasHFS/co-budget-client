import { useExpense } from "@/modules/expenses"
import { Expense } from "@/modules/expenses/domain/Expense"
import { NumericFormat } from "react-number-format"

export const TotalValues = () => {
  const { calculateBalanceToPay, calculateTotalPayable} = useExpense()
  const balanceToPay = calculateBalanceToPay()
  const totalPayablae = calculateTotalPayable()

  console.log({balanceToPay, totalPayablae})

  return (
    <div style={{textAlign: 'center'}}>
      <div>
        <span>Total de Gastos:</span>
        <NumericFormat
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(totalPayablae).toFixed(2)}
          />
      </div>
      <div>
        <span>Saldo a pagar:</span>
        <NumericFormat
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(balanceToPay).toFixed(2)}
          />
      </div>
    </div>
  )
}
