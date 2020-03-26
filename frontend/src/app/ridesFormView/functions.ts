import { lensPath, over, pipe } from "ramda";
import { v4 as uuidv4 } from "uuid";
import { Rides, Stop } from "../../model";
import { Stops } from "./components/RidesForm";

type NestedPartialStop = NestedPartial<Stop>;

export const removeSpacesFromPhoneNubmer = over(lensPath(['contact', 'phoneNumber']), phoneNumber => phoneNumber.replace(/\s/g, ''))
export const setNoteForDriverDefault = over(lensPath(['noteForDriver']), note => note || 'COVID 19 cz');

const processStopData = pipe<NestedPartialStop, NestedPartialStop, NestedPartialStop>(
  removeSpacesFromPhoneNubmer,
  setNoteForDriverDefault,
);

export function createDeliveryRidesBody(data: Stops): Rides {
  const stops = data.stops.map(processStopData) as Stop[];

  return { id: uuidv4(), stops };
}
