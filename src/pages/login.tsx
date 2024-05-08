import { withSSRGuest } from "@/concepts/Auth/middlewares/withSSRGuest";
import { LoginPage } from "@/concepts/Auth/views/Login/LoginPage";

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

