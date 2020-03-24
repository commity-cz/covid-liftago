import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {CallableContext, HttpsError} from "firebase-functions/lib/providers/https";
import {postDeliveryRide} from "./liftago.api";
import FieldValue = admin.firestore.FieldValue;

export async function resetDailyCredits() {
  console.info('Resetting daily credits');
  const organizations = await admin.firestore().collection('organizations').get();

  await Promise.all(organizations.docs.map(organizationDoc => {
    const organization = organizationDoc.data() as Organization;
    console.info(`Reset ${organization.name} credits to ${organization.dailyCredits}`);
    return organizationDoc.ref.update('currentCredits', organization.dailyCredits);
  }));
}

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

  return {
    rideAvailable: currentCredits > 0
  };
}

export async function createDeliveryRide(data: any, context: CallableContext) {
  checkAuthentication(context);
  console.info('deliveryRides request', JSON.stringify(data));

  const ridesAvailability = await deliveryRidesAvailability(null, context);
  if (!ridesAvailability.rideAvailable) {
    throw new functions.https.HttpsError('resource-exhausted', 'Váš denní limit jízd byl vyčerpán.');
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
    await admin.firestore().collection('deliveryRides').add({
      id: response.id,
      created: new Date(),
      userId: context.auth?.uid,
      organizationId: organizationId
    });

    const organizationDoc = admin.firestore().collection('organizations').doc(organizationId);
    await organizationDoc.update("currentCredits", FieldValue.increment(-1));

  } catch (e) {
    console.error('Failed to write deliveryRide to Firestore', e);
  }
}

function checkAuthentication(context: CallableContext) {
  if (!context.auth) {
    throw new HttpsError('unauthenticated', 'Unauthenticated');
  }
}

