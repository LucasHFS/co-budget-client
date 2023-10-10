import { withSSRGuest } from "@/modules/auth/middlewares/withSSRGuest";
import { RegisterPage } from "@/modules/pages/register/RegisterPage";

const Page = () => {
  return <RegisterPage />;
};

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {
      title: 'Cadastro'
    }
  }
})

export default Page;
