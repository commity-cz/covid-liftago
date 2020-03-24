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
  created: Date
}

interface DailyLimits {
  maxRidesPerDay: number,
  ridesToday: number
}
