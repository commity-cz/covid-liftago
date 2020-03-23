import fetch from "node-fetch";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {CallableContext} from "firebase-functions/lib/providers/https";

export async function deliveryRidesAvailability(data: any, context: CallableContext) {
  checkAuthentication(context);

  const organizationId = context.auth?.token?.organization;
  console.info(`Checking rides availability for organization: ${organizationId}`);

  if (!organizationId) {
    return {
      rideAvailable: false
    };
  }

  const organizationRef = await admin.firestore().collection('organizations').doc(organizationId).get();
  const organization = organizationRef.data() as Organization ;

  const dailyRidesLimit = organization.dailyRidesLimit || 0;
  const ridesToday = organization.ridesToday || 0;

  console.info(`Organization ${organization.name} limit: ${ridesToday}/${dailyRidesLimit}`);

  return {
    rideAvailable: ridesToday < dailyRidesLimit
  };
}

export function createDeliveryRide(data: any, context: CallableContext) {
  checkAuthentication(context);
  console.info('deliveryRides request', JSON.stringify(data));
  return fetch(`${functions.config().liftago.url}/deliveryRides`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${functions.config().liftago.token}`
      },
    }
  )
    .then(checkStatus)
    .then(res => res.json())
    .then((json: CreateDeliveryRideResponse) => {
      if (json.id) {
        console.info('deliveryRides response', JSON.stringify(json));
        admin.firestore().collection('deliveryRides').add({
          id: json.id,
          created: new Date(),
          userId: context.auth?.uid
        }).catch(e => console.error('Failed to write deliveryRide to Firestore', e));
      } else {
        console.error('Missing ID in deliveryRides response', JSON.stringify(json));
      }
      return json;
    });
}

function checkAuthentication(context: CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Unauthenticated');
  }
}

function checkStatus(res: any): Response | Promise<never> {
  if (res.ok) {
    return res;
  } else {
    return res.json().then((json: LiftagoApiError) => {
      console.warn('deliveryRides error response', json);
      throw new functions.https.HttpsError('invalid-argument', json.message);
    });
  }
}
