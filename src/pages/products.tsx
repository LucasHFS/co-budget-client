import { withSSRAuth } from "@/modules/auth/middlewares/withSSRAuth";
import { ProductsPage } from "@/modules/pages/products/ProductsPage";

const Page = () => {
  return <ProductsPage />;
};

export default Page;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

