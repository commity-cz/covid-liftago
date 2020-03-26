import * as functions from "firebase-functions";
import {getDeliveryRide} from "./liftago.api";
import * as admin from "firebase-admin";
import {parseIsoDate} from "../utils/date.utils";
import {FUNCTIONS_REGION} from "../constants";

export async function deliveryRideWebhook(req: functions.Request, resp: functions.Response) {
  const rideDocumentId = req.query.rideDocumentId;
  const deliveryRideDoc = admin.firestore().collection('deliveryRides').doc(rideDocumentId);
  await updateDeliveryRide(deliveryRideDoc);
  resp.send();
}

export function getWebhookUrl(rideDocumentId: string) {
  return `https://${FUNCTIONS_REGION}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/deliveryRideWebhook?rideDocumentId=${rideDocumentId}`;
}

export async function updateAllDeliveryRides(req: functions.Request, resp: functions.Response) {
  const allDeliveryRidesDocuments = await admin.firestore().collection('deliveryRides').listDocuments();
  await Promise.all(allDeliveryRidesDocuments.map(doc => updateDeliveryRide(doc)));
  resp.send();
}

async function updateDeliveryRide(deliveryRideDoc: FirebaseFirestore.DocumentReference) {
  const rideId = (await deliveryRideDoc.get()).data()?.id;
  const ride = await getDeliveryRide(rideId);

  const deliveryRideUpdate: Partial<DeliveryRide> = {
    rideStatus: ride.rideStatus,
    pickupArrivalEstimateAt: parseIsoDate(ride.pickupArrivalEstimateAt),
    destinationArrivalEstimateAt: parseIsoDate(ride.destinationArrivalEstimateAt),
    completedAt: parseIsoDate(ride.completedAt),
    positionLink: ride.links.position
  };

  console.info(`Updating ride ${deliveryRideDoc.id}`, JSON.stringify(deliveryRideUpdate));
  await deliveryRideDoc.update(deliveryRideUpdate);
}

