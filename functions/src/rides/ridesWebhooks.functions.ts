import * as functions from "firebase-functions";
import {getDeliveryRide} from "./liftago.api";
import * as admin from "firebase-admin";
import {parseIsoDate} from "../utils/date.utils";
import {FUNCTIONS_REGION} from "../constants";

export async function deliveryRideWebhook(req: functions.Request, resp: functions.Response) {
  const rideDocumentId = req.query.rideDocumentId;
  console.info(`Ride updated: ${rideDocumentId}`);

  const deliveryRideDoc = admin.firestore().collection('deliveryRides').doc(rideDocumentId);

  const rideId = (await deliveryRideDoc.get()).data()?.id;
  const ride = await getDeliveryRide(rideId);

  const deliveryRideUpdate: Partial<DeliveryRide> = {
    rideStatus: ride.rideStatus,
    pickupArrivalEstimateAt: parseIsoDate(ride.pickupArrivalEstimateAt),
    destinationArrivalEstimateAt: parseIsoDate(ride.destinationArrivalEstimateAt),
    completedAt: parseIsoDate(ride.completedAt),
    cancelLink: ride.links.cancel,
    positionLink: ride.links.position
  };

  console.info(`Updating ride ${rideDocumentId}`, JSON.stringify(deliveryRideUpdate));
  await deliveryRideDoc.update(deliveryRideUpdate);

  resp.send();
}

export function getWebhookUrl(rideDocumentId: string) {
  return `https://${FUNCTIONS_REGION}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/deliveryRideWebhook?rideId=${rideDocumentId}`;
}
