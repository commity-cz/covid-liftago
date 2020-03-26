import { lensPath, over, pipe } from "ramda";
import { v4 as uuidv4 } from "uuid";
import { Rides, Stop } from "../../model";
import { Stops } from "./components/RidesForm";

type NestedPartialStop = NestedPartial<Stop>;

export const removeSpacesFromPhoneNumber = over(lensPath(['contact', 'phoneNumber']), phoneNumber => phoneNumber.replace(/\s/g, ''))
export const setNoteForDriverDefault = over(lensPath(['noteForDriver']), note => note || 'COVID 19 cz');

const processStopData = pipe<NestedPartialStop, NestedPartialStop, NestedPartialStop>(
  removeSpacesFromPhoneNumber,
  setNoteForDriverDefault,
);

const multiplePlacesText = 'Doručení na více míst.';
export const setMultipleDestinationsToStops = over(lensPath([0, 'noteForDriver']), note => note ? `${multiplePlacesText} ${note}` : multiplePlacesText);

export function createDeliveryRidesBody(data: Stops): Rides {
  let stops = data.stops.map(processStopData) as Stop[];

  if (stops.length > 2) {
    stops = setMultipleDestinationsToStops(stops);
  }

  return { id: uuidv4(), stops };
}
