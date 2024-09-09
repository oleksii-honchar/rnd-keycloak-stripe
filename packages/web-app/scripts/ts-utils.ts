
type PickInput = Record<PropertyKey, unknown>;

export function pick(
  object: PickInput,
  keys: string[]
): Pick<PickInput, keyof PickInput> {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Pick<PickInput, keyof PickInput>);
}
