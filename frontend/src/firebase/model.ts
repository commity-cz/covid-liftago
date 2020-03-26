export interface DeliveryRidesAvailability {
  rideAvailable: boolean
}

type FirestoreDate = {
  seconds: number,
  nanoseconds: number
}

export enum RideStatus {
  PROCESSING = 'PROCESSING',
  ACCEPTED = 'ACCEPTED',
  WAITING = 'WAITING',
  ON_BOARD = 'ON_BOARD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export const statusName = {
  [RideStatus.PROCESSING]: 'Čeká na řidiče',
  [RideStatus.ACCEPTED]: 'Přijato řidičem',
  [RideStatus.WAITING]: 'Na místě vyzvednutí',
  [RideStatus.ON_BOARD]: 'Na cestě',
  [RideStatus.COMPLETED]: 'Doručeno',
  [RideStatus.CANCELLED]: 'Zrušeno',
  [RideStatus.REJECTED]: 'Zrušeno - nenalezen řidič',
};

export interface DeliveryRide {
  id: string;
  organizationId: string;
  userId: string;
  created: FirestoreDate;
  pickupArrivalEstimateAt?: FirestoreDate;
  destinationArrivalEstimateAt?: FirestoreDate;
  completedAt?: FirestoreDate;
  rideStatus?: RideStatus;
  cancelLink?: string;
  positionLink?: string;
  userEmail?: string;
}
