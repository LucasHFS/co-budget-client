import { withSSRAuth } from "@/concepts/auth/middlewares/withSSRAuth";
import { BudgetsPage } from "@/concepts/pages/budgets/BudgetsPage";

const Page = () => {
  return <BudgetsPage />;
};

export default Page;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {
      title: 'Orçamento'
    }
  }
})

