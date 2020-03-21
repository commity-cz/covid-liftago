import React, {useContext, useState} from 'react';
import {FirebaseContext} from "../../firebase";
import RidesForm from "./RidesForm";
import {Alert} from "@material-ui/lab";

function RidesFormView() {
  const firebase = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFormSubmit = (data: Object) => {
    // TODO: add ids to data and all stops, in case of duplicity, submit again
    firebase?.addDeliveryRide(data)
      .then(_ => {
        if (_.data.code) {
          setErrorMessage(_.data.code); // TODO: localize error message
        }
        // TODO: on success clear form
      })
      .catch(_ => console.log(_));
  };

  return (
    <>
      {
        errorMessage &&
          <Alert severity="error">{errorMessage}</Alert>
      }
      <RidesForm onSubmit={onFormSubmit} />
    </>
  );
}

export default RidesFormView;
