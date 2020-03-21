import React, {useContext, useState} from 'react';
import {FirebaseContext} from "../../firebase";
import RidesForm from "./RidesForm";
import {Alert} from "@material-ui/lab";
import {v4 as uuidv4} from 'uuid';
import {useHistory} from "react-router-dom";

function RidesFormView() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFormSubmit = (data: Object) => {
    // TODO: in case of duplicity, submit again
    if (isSubmittingData) {
      return;
    }
    setIsSubmittingData(true);
    firebase?.addDeliveryRide(createDeliveryRidesBody(data))
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

function createDeliveryRidesBody(data: Object) {
  return {...data, id: uuidv4()};
}

export default RidesFormView;
