import { withSSRGuest } from "@/concepts/auth/middlewares/withSSRGuest";
import { RegisterPage } from "@/concepts/pages/register/RegisterPage";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Co-Finance - Register</title>
      </Head>
      <RegisterPage />
    </>
    );
};

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {
      title: 'Cadastro'
    }
  }
})

export default Page;
