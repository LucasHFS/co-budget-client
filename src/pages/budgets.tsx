import { withSSRAuth } from "@/modules/auth/middlewares/withSSRAuth";
import { BudgetsPage } from "@/modules/pages/budgets/BudgetsPage";

const Page = () => {
  return <BudgetsPage />;
};

export default Page;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

