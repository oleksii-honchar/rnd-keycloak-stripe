function pick<T, K extends keyof T>(object: T, keys: K[]): Partial<T> {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);
}

function set<T>(object: T, path: string, value: unknown): void {
  const keys = path.split(".");
  let current: any = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (key !== undefined && !(key in current)) {
      // Check if the next key is a number
      current[key] = /^\d+$/.test(keys[i + 1] ?? "") ? [] : {};
    }
    if (key !== undefined) {
      current = current[key];
    }
  }

  const lastKey = keys[keys.length - 1];
  if (lastKey !== undefined) {
    current[lastKey] = value;
  }
}

function get<T, R>(obj: T, path: string, defaultValue?: R): R {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) =>
          res !== null && res !== undefined
            ? (res as Record<string, any>)[key]
            : res,
        obj as object,
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result !== undefined && result !== obj
    ? (result as R)
    : (defaultValue as R);
}

function camelToKebab(camelCaseString: string): string {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

function omit<T extends object, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> {
  return Object.keys(object).reduce(
    (result, key) => {
      if (!keys.includes(key as K)) {
        // @ts-expect-error TS doesn't like this
        result[key as keyof Omit<T, K>] = object[key as keyof T];
      }
      return result;
    },
    {} as Omit<T, K>,
  );
}

export const nl = {
  camelToKebab,
  get,
  isObjectEmpty,
  omit,
  pick,
  set,
};
