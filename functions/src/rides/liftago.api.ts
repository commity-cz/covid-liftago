import fetch from "node-fetch";
import * as functions from "firebase-functions";
import {HttpsError} from "firebase-functions/lib/providers/https";
import {getWebhookUrl} from "./ridesWebhooks.functions";

export async function postDeliveryRide(data: any): Promise<CreateDeliveryRideResponse> {
  const webhookUrl = getWebhookUrl(data.id);
  console.info(`Setting webhook: ${webhookUrl}`);
  const dataToSend = {
    ...data,
    webhook: {
      url: webhookUrl
    }
  };

  const response = await fetch(`${functions.config().liftago.url}/deliveryRides`, {
      method: 'post',
      body: JSON.stringify(dataToSend),
      headers: createHeaders(),
    }
  );

  await checkStatus(response);
  return response.json();
}

export async function getDeliveryRide(rideId: string): Promise<GetDeliveryRideResponse> {
  const response = await fetch(`${functions.config().liftago.url}/deliveryRides/${rideId}`, {
    headers: createHeaders()
  });
  await checkStatus(response);
  return response.json();
}

async function checkStatus(res: any): Promise<Response> {
  if (res.ok) {
    return res;
  } else {
    const json: LiftagoApiError = await res.json();
    console.warn('deliveryRides error response', json);
    throw new HttpsError('invalid-argument', json.message);
  }
}

function createHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${functions.config().liftago.token}`
  };
}
