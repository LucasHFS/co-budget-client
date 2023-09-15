import { withSSRAuth } from "@/modules/auth/middlewares/withSSRAuth";
import { DriversPage } from "@/modules/pages/drivers/DriversPage";

const Page = () => {
  return <DriversPage />;
};

export default Page;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

