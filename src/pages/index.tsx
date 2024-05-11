import { withSSRAuth } from "@/concepts/Auth/middlewares/withSSRAuth";
import { HomePage } from "@/concepts/Transaction/views/home/HomePage";

const Page = () => {
  return <HomePage />;
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {
      title: 'Gastos'
    }
  }
})

export default Page;
