import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from "../../firebase";
import {DeliveryRide} from "../../firebase/model";
import CenteredCircularProgress from "../common/CenteredCircularProgress";
import RidesTable from "./RidesTable";

const RidesListView: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState<DeliveryRide[] | undefined>();
  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    const unsubscribePromise = firebase?.getDeliveryRides((rides: any) => {
      const items = rides.docs.map((item: any) => {
        const data = item.data();
        data.documentId = item.id;
        return data as DeliveryRide;
      });
      setData(items);
    }, date);

    return () => {
      unsubscribePromise && unsubscribePromise.then((unsubscribe) => {unsubscribe()});
    }
  }, [firebase, date]);

  return (
    <>
      {
        data !== undefined ?
          <RidesTable items={data} date={date} setDate={setDate}/>
          :
          <CenteredCircularProgress/>
      }
    </>
  );
};

export default RidesListView;
