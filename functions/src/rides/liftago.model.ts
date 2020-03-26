interface CreateDeliveryRideResponse {
  id: string
}

interface LiftagoApiError {
  code: string,
  message: string
}

interface GetDeliveryRideResponse {
  id: string,
  rideStatus: string,
  pickupArrivalEstimateAt: string,
  destinationArrivalEstimateAt: string,
  completedAt: string,
  links: {
    position: string
    cancel: string
  }
}
