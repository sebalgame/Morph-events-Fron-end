import { EventMF } from "./event";

export interface TicketType {
  id: number,
  name: string,
  price: number,
  availableQuantity: number,
  event: EventMF
}
