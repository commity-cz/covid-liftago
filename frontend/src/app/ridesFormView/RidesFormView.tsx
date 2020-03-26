import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
import RidesForm, { Stops } from "./components/RidesForm";
import { createDeliveryRidesBody } from "./functions";

function RidesFormView() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rideAvailable, setRideAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    firebase?.getDeliveryRidesAvailability().then(data => {
      setRideAvailable(data.rideAvailable);
    });
  }, [firebase]);

  useEffect(() => {
    if (rideAvailable === false) {
      history.push('/ride-unavailable')
    }
  }, [rideAvailable, history]);

  const onFormSubmit = (data: Stops): Promise<void> => {
    if (!firebase) {
      setErrorMessage(`Chyba při odesílání: Missing Firebase instance`);
      return Promise.reject(`Missing Firebase instance`);
    }

    const dataToSend = createDeliveryRidesBody(data);

    // TODO: in case of duplicity, submit again
    return firebase.addDeliveryRide(dataToSend)
      .then(_ => {
        history.push('/detail')
      })
      .catch(_ => {
        setErrorMessage(`Chyba při odesílání: ${_}`);
      });
  };

  return (
    <>
      {
        errorMessage &&
        <Alert style={{ marginBottom: 16 }} severity="error">{errorMessage}</Alert>
      }
      <RidesForm onSubmit={onFormSubmit}/>
    </>
  );
}

export default RidesFormView;
