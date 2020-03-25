export interface DeliveryRidesAvailability {
  rideAvailable: boolean
}

type FirestoreDate = {
  seconds: number,
  nanoseconds: number
}

export const statusName = {
  'PROCESSING': 'Zpracovává se',
  'ACCEPTED': 'Přijato',
  'WAITING': 'Čeká na vyzvednutí',
  'ON_BOARD': 'Na cestě',
  'COMPLETED': 'Doručeno',
  'CANCELLED': 'Zrušeno',
  'REJECTED': 'Zamítnuto',
};

export interface DeliveryRide {
  id: string;
  organizationId: string;
  userId: string;
  created: FirestoreDate;
  pickupArrivalEstimateAt?: FirestoreDate;
  destinationArrivalEstimateAt?: FirestoreDate;
  completedAt?: FirestoreDate;
  rideStatus?: 'PROCESSING' | 'ACCEPTED' | 'WAITING' | 'ON_BOARD' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
  cancelLink?: string;
  positionLink?: string;
}
