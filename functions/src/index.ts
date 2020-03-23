import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as ridesFunctions from "./rides/rides.functions";
import * as organizationsFunctions from "./organizations/organizations.functions";

admin.initializeApp();

const europeFunctions = functions.region('europe-west1');

export const deliveryRidesAvailability = europeFunctions.https.onCall(ridesFunctions.deliveryRidesAvailability);
export const deliveryRides = europeFunctions.https.onCall(ridesFunctions.createDeliveryRide);

const organizationsDocument = europeFunctions.firestore.document('organizations/{organizationId}');
export const onOrganizationWrite = organizationsDocument.onWrite(organizationsFunctions.onOrganizationWrite);
