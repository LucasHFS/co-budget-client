import { withSSRAuth } from "@/modules/auth/middlewares/withSSRAuth";
import { ClientsPage } from "@/modules/pages/clients/ClientsPage";

const Page = () => {
  return <ClientsPage />;
};

export default Page;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

