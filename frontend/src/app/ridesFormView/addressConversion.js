import { append, fromPairs, head, juxt, pathOr, pipe, prop, reduce } from "ramda";

const getKey = pipe(prop('types'), head);
const getValue = prop('long_name');

const getEntry = juxt([getKey, getValue]);

function componentToPair(acc, component) {
  const entry = getEntry(component);
  return append(entry, acc)
}

// TODO test
// TODO convert to TS
export const convert = pipe(
  pathOr([], [0,'address_components']),
  reduce(componentToPair, []),
  fromPairs
);
