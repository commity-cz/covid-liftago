interface Organization {
  name: string,
  dailyCredits: number,
  currentCredits: number,
  users: string[]
}

interface DeliveryRide {
  id: string,
  organizationId: string,
  userId: string,
  userEmail: string,
  created: Date,
  rideStatus: string,
  pickupArrivalEstimateAt?: Date | null,
  destinationArrivalEstimateAt?: Date | null,
  completedAt?: Date | null,
  positionLink?: string,
  cancelLink?: string
}

interface DailyLimits {
  maxRidesPerDay: number,
  ridesToday: number
}
