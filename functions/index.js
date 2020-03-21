const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deliveryRides = functions
  .region('europe-west1')
  .https.onCall((data, context) => {
    checkAuthentication(context);
    console.log('deliveryRides request', data);
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
      .then(json => {
        if (json.id) {
          console.info('deliveryRides response', JSON.stringify(json));
          admin.firestore().collection('deliveryRides').add({
            id: json.id,
            created: new Date().toISOString()
          });
        } else {
          console.error('Missing ID in deliveryRides response', JSON.stringify(json));
        }
        return json;
      });
  });

function checkAuthentication(context) {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Unauthenticated');
  }
}

function checkStatus(res) {
  if (res.ok) {
    return res;
  } else {
    return res.json().then(json => {
      console.warn('deliveryRides error response', json);
      throw new functions.https.HttpsError('invalid-argument', json.message);
    });
  }
}
