import { withSSRGuest } from "@/modules/auth/middlewares/withSSRGuest";
import { LoginPage } from "@/modules/pages/login/LoginPage";

const Page = () => {
  return <LoginPage />;
};

export default Page;

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {
      title: 'Login'
    }
  }
})

