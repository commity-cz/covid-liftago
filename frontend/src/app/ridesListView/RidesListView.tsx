import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from "../../firebase";

const RidesListView: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState();

  useEffect(() => {
    firebase?.getDeliveryRides().then(data => {
      setData(data.docs);
    })
  }, [firebase]);

  console.log(data);

  return (
    <>
      xx
    </>
  );
};

export default RidesListView;
