import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {CallableContext, HttpsError} from "firebase-functions/lib/providers/https";
import {postDeliveryRide} from "./liftago.api";
import FieldValue = admin.firestore.FieldValue;

export async function deliveryRidesAvailability(data: any, context: CallableContext) {
  checkAuthentication(context);

  const organization = await getOrganizationFromContext(context);
  if (!organization) {
    return {
      ridesAvailable: false
    };
  }

  const currentCredits = organization.currentCredits || 0;
  console.info(`Organization ${organization.name} credits: ${currentCredits}`);

  const dailyLimitsRef = await admin.firestore().collection('limits').doc('daily').get();
  const dailyLimits = dailyLimitsRef.data() as DailyLimits;
  const maxRidesPerDay = dailyLimits.maxRidesPerDay;
  const ridesToday = dailyLimits.ridesToday;
  console.info(`Daily limit ${ridesToday}/${maxRidesPerDay}`);

  return {
    rideAvailable: currentCredits > 0 && ridesToday < maxRidesPerDay
  };
}

export async function createDeliveryRide(data: any, context: CallableContext) {
  checkAuthentication(context);
  console.info('deliveryRides request', JSON.stringify(data));

  const ridesAvailability = await deliveryRidesAvailability(null, context);
  if (!ridesAvailability.rideAvailable) {
    throw new functions.https.HttpsError('resource-exhausted', 'Denní limit jízd byl vyčerpán.');
  }

  const response: CreateDeliveryRideResponse = await postDeliveryRide(data);

  if (response.id) {
    console.info('deliveryRides response', JSON.stringify(response));
    await saveRide(response, context);
  } else {
    console.error('Missing ID in deliveryRides response', JSON.stringify(response));
  }
  return response;
}

async function getOrganizationFromContext(context: CallableContext): Promise<Organization | null> {
  const organizationId = context.auth?.token?.organization;
  console.info(`Checking rides availability for organization: ${organizationId}`);

  if (!organizationId) {
    console.warn(`User ${context.auth?.uid} doesn't belong to any group`);
    return null;
  }

  const organizationRef = await admin.firestore().collection('organizations').doc(organizationId).get();
  return organizationRef.data() as Organization;
}

async function saveRide(response: CreateDeliveryRideResponse, context: CallableContext) {
  try {
    const organizationId = context.auth?.token?.organization;
    const deliveryRide: DeliveryRide = {
      id: response.id,
      created: new Date(),
      userId: context.auth?.uid || '',
      organizationId: organizationId
    };
    await admin.firestore().collection('deliveryRides').add(deliveryRide);

    const organizationDoc = admin.firestore().collection('organizations').doc(organizationId);
    await organizationDoc.update("currentCredits", FieldValue.increment(-1));

    const dailyLimitsDoc = admin.firestore().collection('limits').doc('daily');
    await dailyLimitsDoc.update("ridesToday", FieldValue.increment(1));

  } catch (e) {
    console.error('Failed to write deliveryRide to Firestore', e);
  }
}

function checkAuthentication(context: CallableContext) {
  if (!context.auth) {
    throw new HttpsError('unauthenticated', 'Unauthenticated');
  }
}

