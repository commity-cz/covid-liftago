import React from "react";
import {RideStatus} from "../../firebase/model";
import {
  AssignmentTurnedInOutlined,
  BlockOutlined,
  CloseOutlined,
  DoneAll,
  HourglassEmptyOutlined,
  LocalShippingOutlined,
  PlaceOutlined
} from "@material-ui/icons";

type Props = StandardProps & {
  status?: RideStatus
}

const RideStatusIcon: React.FC<Props> = ({status, ...others}) => {
  switch (status) {
    case RideStatus.PROCESSING:
      return <HourglassEmptyOutlined {...others}/>;
    case RideStatus.ACCEPTED:
      return <AssignmentTurnedInOutlined {...others}/>;
    case RideStatus.WAITING:
      return <PlaceOutlined {...others}/>;
    case RideStatus.ON_BOARD:
      return <LocalShippingOutlined {...others}/>;
    case RideStatus.COMPLETED:
      return <DoneAll {...others}/>;
    case RideStatus.CANCELLED:
      return <CloseOutlined {...others}/>;
    case RideStatus.REJECTED:
      return <BlockOutlined {...others}/>;
    default:
      return null;
  }
};

export default RideStatusIcon;
