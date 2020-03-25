import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from "../../firebase";
import {DeliveryRide} from "../../firebase/model";
import CenteredCircularProgress from "../common/CenteredCircularProgress";
import RidesTable from "./RidesTable";

const RidesListView: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState<DeliveryRide[] | undefined>();

  useEffect(() => {
    firebase?.getDeliveryRides().then(data => {
      const items = data.docs.map(item => {
        return item.data() as DeliveryRide
      });
      setData(items);
    })
  }, [firebase]);

  return (
    <>
      {
        data !== undefined ?
          <RidesTable items={data}/>
          :
          <CenteredCircularProgress/>
      }
    </>
  );
};

export default RidesListView;