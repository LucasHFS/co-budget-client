import { withSSRAuth } from "@/modules/auth/middlewares/withSSRAuth";
import { HomePage } from "@/modules/pages/home/HomePage";

const Page = () => {
  return <HomePage />;
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

export default Page;
