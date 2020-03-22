import { all, hasPath, lensPath, over, pipe } from "ramda";
import React, {useContext, useState} from 'react';
import {FirebaseContext} from "../../firebase";
import { Rides, StopKind } from "../../model";
import RidesForm from "./RidesForm";
import {Alert} from "@material-ui/lab";
import {v4 as uuidv4} from 'uuid';
import {useHistory} from "react-router-dom";

const hasFilledAddress = hasPath(['location', 'address', 'city']);

function allStopsHaveAddress(data: Rides) {
  return all(hasFilledAddress, data.stops)
}

function RidesFormView() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFormSubmit = (data: Rides) => {
    // TODO: in case of duplicity, submit again

    if (isSubmittingData) {
      return;
    }

    const dataToSend = createDeliveryRidesBody(data);
    if(!allStopsHaveAddress(dataToSend)) {
      return;
    }

    setIsSubmittingData(true);
    firebase?.addDeliveryRide(dataToSend)
      .then(_ => {
        history.push('/detail')
      })
      .catch(_ => {
        setIsSubmittingData(false);
        setErrorMessage(`Chyba při odesílání: ${_}`);
      });
  };

  return (
    <>
      {
        errorMessage &&
        <Alert style={{marginBottom: 16}} severity="error">{errorMessage}</Alert>
      }
      <RidesForm onSubmit={onFormSubmit} isSubmittingData={isSubmittingData}/>
    </>
  );
}

const fixContactPhoneNumber = over(lensPath(['contact', 'phoneNumber']), phoneNumber => phoneNumber.replace(/\s/g, ''))
const setNoteForDriver = over(lensPath(['noteForDriver']), note => note || 'COVID 19 cz');
const fixKind = over(lensPath(['kind']), kind => kind || StopKind.DESTINATION);

const processStopData = pipe(
  fixContactPhoneNumber,
  fixKind,
  setNoteForDriver
);

function createDeliveryRidesBody(data: Rides) {
  const stops = data.stops.map(processStopData);

  return {id: uuidv4(), stops};
}

export default RidesFormView;
