const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.deliveryRides = functions
    .region('europe-west1')
    .https.onRequest((request, response) => {
        fetch(`${functions.config().liftago.url}/deliveryRides`, {
                method: 'post',
                body: JSON.stringify(request.body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${functions.config().liftago.token}`
                },
            }
        )
            .then(res => res.json())
            .then(json => {
                response.send(json);
                return json;
            })
            .catch(e => response.status(500).send(e));
    });
