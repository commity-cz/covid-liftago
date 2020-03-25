export interface DeliveryRidesAvailability {
  rideAvailable: boolean
}

type FirestoreDate = {
  seconds: number,
  nanoseconds: number
}

export interface DeliveryRide {
  id: string;
  organizationId: string;
  userId: string;
  created: FirestoreDate;
}
