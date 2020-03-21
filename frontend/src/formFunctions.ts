import { Path, pathOr } from "ramda";

export function getFullName(baseName: string, name: string) {
  return baseName ? `${baseName}.${name}` : name
}

export function getCurrentErrors(errorPath: (string | number)[], errors: object): object {
  return pathOr<any>({}, errorPath as Path, errors)
}
