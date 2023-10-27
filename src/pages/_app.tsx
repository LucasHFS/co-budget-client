import type { AppProps } from "next/app";
import "@/modules/styles/global.scss";
import { Layout } from "@/modules/ui/Layout/Layout";
import { AuthProvider } from "@/modules/auth";
import { TransactionProvider, BudgetProvider } from "@/modules/transactions";
import { ConfirmProvider } from "material-ui-confirm";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
        <BudgetProvider>
          <TransactionProvider>
            <ConfirmProvider>
              <Layout title={pageProps.title}>
                <Component {...pageProps} />
              </Layout>
            </ConfirmProvider>
          </TransactionProvider>
        </BudgetProvider>
    </AuthProvider>
  );
}
