import { Budget } from "@/modules/expenses/domain/Budget";
import Head from "next/head";
import { BudgetBox } from "./BudgetBox";
import styles from "./BudgetsList.module.scss";

export const BudgetsList = ({budgets}: {budgets:Budget[]}) => {
  return (
    <>
      <Head>
        <title>Co-Finance - Budgets</title>
      </Head>

      <h2 className={styles.title}>Orçamentos Cadastrados</h2>
      <div className={styles.container}>
        {budgets?.map((budget) => <BudgetBox key={budget.id} budget={budget} />)}
      </div>
    </>
  );
};

