import * as functions from "firebase-functions";
import {getDeliveryRide} from "./liftago.api";
import * as admin from "firebase-admin";
import {parseIsoDate} from "../utils/date.utils";
import {FUNCTIONS_REGION} from "../constants";

export async function deliveryRideWebhook(req: functions.Request, resp: functions.Response) {
  const rideId = req.query.rideId;
  console.info(`Ride updated: ${rideId}`);

  const ride = await getDeliveryRide(rideId);
  console.log(ride);

  const deliveryRideUpdate: Partial<DeliveryRide> = {
    rideStatus: ride.rideStatus,
    pickupArrivalEstimateAt: parseIsoDate(ride.pickupArrivalEstimateAt),
    destinationArrivalEstimateAt: parseIsoDate(ride.destinationArrivalEstimateAt),
    completedAt: parseIsoDate(ride.completedAt),
    cancelLink: ride.links.cancel,
    positionLink: ride.links.position
  };

  console.info(`Updating ride ${rideId}`, JSON.stringify(deliveryRideUpdate));
  await admin.firestore().collection('deliveryRides').doc(rideId).update(deliveryRideUpdate);

  resp.send();
}

export function getWebhookUrl(rideId: string) {
  return `https://${FUNCTIONS_REGION}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/deliveryRideWebhook?rideId=${rideId}`;
}
