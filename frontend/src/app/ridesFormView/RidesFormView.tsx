import React, {useContext, useState} from 'react';
import {FirebaseContext} from "../../firebase";
import RidesForm from "./RidesForm";
import {Alert} from "@material-ui/lab";
import {v4 as uuidv4} from 'uuid';
import {useHistory} from "react-router-dom";

function RidesFormView() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFormSubmit = (data: Object) => {
    // TODO: in case of duplicity, submit again
    firebase?.addDeliveryRide(createDeliveryRidesBody(data))
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
        <Alert style={{marginBottom: 16}} severity="error">{errorMessage}</Alert>
      }
      <RidesForm onSubmit={onFormSubmit}/>
    </>
  );
}

function createDeliveryRidesBody(data: Object) {
  // @ts-ignore
  const stops = data.stops.map(stop => ({
    ...stop,
    stopId: uuidv4(),
    location: {
      ...stop.location,
      address: {
        ...stop.location.address,
        country: 'Czech republic'
      },
    }
  }));
  stops[0].kind = 'PICKUP';
  stops[1].kind = 'DESTINATION';
  return {...data, id: uuidv4(), stops};
}

export default RidesFormView;
