const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deliveryRides = functions
    .region('europe-west1')
    .https.onCall((data, context) => {
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
            .then(res => res.json())
            .then(json => {
                if (json.id) {
                    console.info('deliveryRides response', json);
                    admin.firestore().collection('deliveryRides').add({
                        id: json.id,
                        created: new Date().toISOString()
                    });
                } else {
                    console.warn('deliveryRides error', json);
                }
                return json;
            }).catch(e => console.warn('deliveryRides error', e));
    });
