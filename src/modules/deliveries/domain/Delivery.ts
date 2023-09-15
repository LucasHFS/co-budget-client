import { Driver } from "@/modules/drivers/domain/Driver";
import { Order } from "@/modules/orders/domain/Order";

export type Delivery = {
  id?: number
  instructions?: string
  status: string
  deliveredAt: string
  order: Order
  driver: Driver | null
};
