import { Address } from "./app/ridesFormView/components/AddressFormContainer";
import { Contact } from "./app/ridesFormView/components/ContactFormContainer";

export interface Stop {
  stopId: string,
  contact: Contact,
  locations: {
    address: Address
  },
  noteForDriver: string
  kind: StopKind
}

export interface Rides {
  stops: Stop[],
  id: string
}

export enum StopKind {
  PICKUP = "PICKUP",
  DESTINATION = "DESTINATION",
  FALLBACK_DESTINATION = "FALLBACK_DESTINATION",
}
