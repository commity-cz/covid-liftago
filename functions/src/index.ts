import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as ridesFunctions from "./rides/rides.functions";
import * as organizationsFunctions from "./organizations/organizations.functions";
import * as creditsFunctions from "./credits/credits.functions";

admin.initializeApp();

const europeFunctions = functions.region('europe-west1');

export const deliveryRidesAvailability = europeFunctions.https.onCall(ridesFunctions.deliveryRidesAvailability);
export const createDeliveryRide = europeFunctions.https.onCall(ridesFunctions.createDeliveryRide);

export const resetDailyCredits = europeFunctions.pubsub.schedule('0 0 * * *').timeZone('Europe/Prague')
  .onRun(creditsFunctions.resetDailyCredits);

const organizationsDocument = europeFunctions.firestore.document('organizations/{organizationId}');
export const onOrganizationWrite = organizationsDocument.onWrite(organizationsFunctions.onOrganizationWrite);


