import type { AppProps } from "next/app";
import "@/modules/styles/global.scss";
import { Layout } from "@/modules/ui/Layout/Layout";
import { AuthProvider } from "@/modules/auth";
import { ProductProvider } from "@/modules/products";
import { OrderProvider, SaleEventProvider } from "@/modules/orders";
import { ConfirmProvider } from "material-ui-confirm";
import { ClientProvider } from "@/modules/clients";
import { DriverProvider } from "@/modules/drivers";
import { DeliveryProvider } from "@/modules/deliveries";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <ProductProvider>
        <SaleEventProvider>
          <OrderProvider>
            <DeliveryProvider>
              <ClientProvider>
                <DriverProvider>
                  <ConfirmProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </ConfirmProvider>
                </DriverProvider>
              </ClientProvider>
            </DeliveryProvider>
          </OrderProvider>
        </SaleEventProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
