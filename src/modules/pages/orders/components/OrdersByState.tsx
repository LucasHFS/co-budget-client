import { OrdersByStateType } from "@/modules/orders/view/components/OrderProvider";
import { OrdersList } from "./OrdersList";

export const OrdersByState = ({ ordersByState }: { ordersByState: OrdersByStateType }) => {
  return (
    <>
      {/* @ts-ignore */}
      {Object.entries(ordersByState).map(([state, { orders }]) => (
        <OrdersList key={state} orders={orders} title={state} />
      ))}
    </>
  );
};
