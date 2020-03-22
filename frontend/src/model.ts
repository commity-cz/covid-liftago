export type Contact = {
  name: string,
  company: string
  phoneNumber: string
}

export type Address = {
  "street": string,
  "houseNumber": string
  "city": string
  "zipCode": string
  "country": string
  "description": string
}

export interface Stop {
  stopId: string,
  contact: Contact,
  locations: {
    address: Address
  },
  noteForDriver: string
}

export interface Rides {
  stops: Stop[],
  id: string
}
