import { withSSRAuth } from "@/modules/auth/middlewares/withSSRAuth";
import { SaleEventsPage } from "@/modules/pages/sale_events/SaleEventsPage";

const Page = () => {
  return <SaleEventsPage />;
};

export default Page;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

