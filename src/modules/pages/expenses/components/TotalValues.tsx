import { useExpense } from "@/modules/expenses"
import { NumericFormat } from "react-number-format"

export const TotalValues = () => {
  const { calculateBalanceToPay, calculateTotalPayable} = useExpense()
  const balanceToPay = calculateBalanceToPay()
  const totalPayablae = calculateTotalPayable()
  const totalPaid = totalPayablae - balanceToPay

  console.log({balanceToPay, totalPayablae, totalPaid})

  return (
    <div style={{textAlign: 'center', fontWeight: 'bold', display: 'flex', flexDirection: 'column', gap: '5px'}}>
      <div>
        <span style={{color: 'red'}}>Saldo a pagar: </span>
        <NumericFormat
            style={{color: 'red'}}
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(balanceToPay).toFixed(2)}
          />
      </div>
      <div>
        <span style={{color: 'lightgreen'}}>Saldo pago: </span>
        <NumericFormat
            style={{color: 'lightgreen'}}
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(totalPaid).toFixed(2)}
          />
      </div>
      <div>
        <span>Total de Gastos: </span>
        <NumericFormat
            prefix="R$  "
            displayType="text"
            value={parseFloat(totalPayablae).toFixed(2)}
          />
      </div>
    </div>
  )
}
