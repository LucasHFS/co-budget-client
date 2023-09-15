import { withSSRAuth } from "@/modules/auth/middlewares/withSSRAuth";
import { DeliveriesPage } from "@/modules/pages/deliveries/DeliveriesPage";

const Page = () => {
  return <DeliveriesPage />;
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

export default Page;
