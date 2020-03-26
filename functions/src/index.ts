import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as ridesFunctions from "./rides/rides.functions";
import * as organizationsFunctions from "./organizations/organizations.functions";
import * as creditsFunctions from "./credits/credits.functions";
import * as ridesWebhooks from "./rides/ridesWebhooks.functions";
import {FUNCTIONS_REGION, TIMEZONE} from "./constants";

admin.initializeApp();

const regionFunctions = functions.region(FUNCTIONS_REGION);

export const deliveryRidesAvailability = regionFunctions.https.onCall(ridesFunctions.deliveryRidesAvailability);
export const createDeliveryRide = regionFunctions.https.onCall(ridesFunctions.createDeliveryRide);

export const deliveryRideWebhook = regionFunctions.https.onRequest(ridesWebhooks.deliveryRideWebhook);
export const updateAllDeliveryRides = regionFunctions.https.onRequest(ridesWebhooks.updateAllDeliveryRides);

export const resetDailyCredits = regionFunctions.pubsub.schedule('0 0 * * *').timeZone(TIMEZONE)
  .onRun(creditsFunctions.resetDailyCredits);

const organizationsDocument = regionFunctions.firestore.document('organizations/{organizationId}');
export const onOrganizationWrite = organizationsDocument.onWrite(organizationsFunctions.onOrganizationWrite);

