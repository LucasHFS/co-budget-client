import type { AppProps } from "next/app";
import "@/components/theme/global.scss";
import { Layout } from "@/concepts/ui/Layout/Layout";
import { TransactionProvider } from "@/concepts/transactions";
import { ConfirmProvider } from "material-ui-confirm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/concepts/Auth/store/AuthProvider";
import { BudgetProvider } from "@/concepts/Budget/store/BudgetProvider";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <BudgetProvider>
            <TransactionProvider>
              <ConfirmProvider>
                <Layout title={pageProps.title} isApp={pageProps.isApp} >
                  <Component {...pageProps} />
                  <ToastContainer />
                </Layout>
              </ConfirmProvider>
            </TransactionProvider>
          </BudgetProvider>
      </AuthProvider>
    </QueryClientProvider>

  );
}
