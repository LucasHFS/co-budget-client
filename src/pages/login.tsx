import { withSSRGuest } from "@/concepts/auth/middlewares/withSSRGuest";
import { LoginPage } from "@/concepts/pages/login/LoginPage";

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

