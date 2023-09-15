import { DeliveriesByStateType } from "@/modules/deliveries/view/components/DeliveryProvider";
import { DeliveriesList } from "./DeliveriesList";

export const DeliveriesByState = ({ deliveriesByState }: { deliveriesByState: DeliveriesByStateType }) => {
  return (
    <>
      {/* @ts-ignore */}
      {Object.entries(deliveriesByState).map(([state, { deliveries }]) => (
        <DeliveriesList key={state} deliveries={deliveries} title={state} />
      ))}
    </>
  );
};
