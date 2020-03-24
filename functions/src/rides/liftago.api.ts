import fetch from "node-fetch";
import * as functions from "firebase-functions";

export async function postDeliveryRide(data: any): Promise<CreateDeliveryRideResponse> {
  const response = await fetch(`${functions.config().liftago.url}/deliveryRides`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${functions.config().liftago.token}`
      },
    }
  );

  await checkStatus(response);
  return await response.json();
}

async function checkStatus(res: any): Promise<Response> {
  if (res.ok) {
    return res;
  } else {
    const json: LiftagoApiError = await res.json();
    console.warn('deliveryRides error response', json);
    throw new functions.https.HttpsError('invalid-argument', json.message);
  }
}
