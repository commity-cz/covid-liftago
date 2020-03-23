import fetch from "node-fetch";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {CallableContext} from "firebase-functions/lib/providers/https";

export function deliveryRidesAvailability(data: any, context: CallableContext) {
  checkAuthentication(context);
  return {
    rideAvailable: true
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
          created: new Date().toISOString(),
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
