import React, {useContext} from 'react';
import {FirebaseContext} from "../../firebase";
import RidesForm from "./RidesForm";

function RidesFormView() {
  const firebase = useContext(FirebaseContext);

  const onFormSubmit = (data: Object) => {
    firebase?.addDeliveryRide(data);
  };

  return (
    <RidesForm onSubmit={onFormSubmit} />
  );
}

export default RidesFormView;
