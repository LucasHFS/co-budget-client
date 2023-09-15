import { Client } from "@/modules/clients/domain/Client";

export type Order = {
  id?: number
  name?: string
  status: string
  notes: string
  isDelivery: boolean
  client: Client;
  products: {
    id: number
    name: string
    price: number
    quantity: number
  }[]
};
