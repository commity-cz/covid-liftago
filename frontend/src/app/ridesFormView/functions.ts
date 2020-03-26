import { assocPath, dissocPath, lensPath, over, pipe } from "ramda";
import { v4 as uuidv4 } from "uuid";
import { Rides, Stop, StopKind } from "../../model";
import { Stops } from "./components/RidesForm";

const fixContactPhoneNumber = over(lensPath(['contact', 'phoneNumber']), phoneNumber => phoneNumber.replace(/\s/g, ''))
const setNoteForDriver = over(lensPath(['noteForDriver']), note => note || 'COVID 19 cz');
const fixKind = over(lensPath(['kind']), kind => kind || StopKind.DESTINATION);
const fixStopId = over(lensPath(['stopId']), stopId => stopId || uuidv4());
const fixCountry = assocPath(['location', 'address', 'country'], 'Czech republic');
const removeAddressVisibility = dissocPath<Stop>(['location', 'address', 'formVisible']);

const processStopData = pipe(
  fixContactPhoneNumber,
  fixKind,
  fixStopId,
  fixCountry,
  removeAddressVisibility,
  setNoteForDriver
);

// TODO test

export function createDeliveryRidesBody(data: Stops): Rides {
  const stops = data.stops.map(processStopData);

  return { id: uuidv4(), stops };
}
