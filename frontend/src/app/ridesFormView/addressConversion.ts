import { append, fromPairs, head, juxt, pathOr, pipe, prop, reduce } from "ramda";
import { Address } from "./components/AddressFormContainer";

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

const getKey = pipe<AddressComponent, string[], string>(
  prop('types'),
  head
);
const getValue = prop('long_name');

const getEntry = juxt([getKey, getValue]);

function componentToPair(acc: Pair[], component: AddressComponent) {
  const entry = getEntry(component);
  return append(entry, acc)
}

type Pair = [string, string];
export type PrefilledAddress = Omit<Address, 'description'>;

function googleAddressToAddress(addressComponents: any): Omit<Address, 'description'> {
  return {
    city: addressComponents.locality || addressComponents.political || addressComponents.administrative_area_level_2 || '',
    street: addressComponents.route || addressComponents.locality || '',
    houseNumber: addressComponents.street_number || addressComponents.town_square || addressComponents.premise || '',
    zipCode: addressComponents.postal_code || '',
    country: "Czech republic",
  }
}

export const convert = pipe<{ address_components: AddressComponent[] }[], AddressComponent[], Pair[], any, PrefilledAddress>(
  pathOr([], [0, 'address_components']),
  reduce(componentToPair, [] as Pair[]),
  fromPairs,
  googleAddressToAddress
);
