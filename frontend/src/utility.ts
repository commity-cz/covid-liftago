import { isEmpty, map, pipe, reject, split } from "ramda";


function tryConvertIndex(stringOrNumberInString: string): number | string {
  const numericValue = parseInt(stringOrNumberInString);
  if (isFinite(numericValue) && numericValue.toString() === stringOrNumberInString) {
    return numericValue;
  }

  return stringOrNumberInString
}

export const stringPathToArray = pipe(
  split(/[.\[\]]/),
  reject(isEmpty),
  map(tryConvertIndex)
);

