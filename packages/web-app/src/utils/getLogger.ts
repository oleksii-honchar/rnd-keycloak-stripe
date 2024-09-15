import pino from "pino";
import { nl } from "src/utils/native-lodash";

const customTransport = {
  info: (obj: Record<string, any>) => {
    const message = `[${obj.name}] ${obj.msg}`;
    if (nl.omit(obj, ["time", "level", "name", "msg"]).length > 0) {
      console.log(message, obj);
    } else {
      console.log(message);
    }
  },
  error: (obj: Record<string, any>) => {
    const message = `[${obj.name}] ${obj.msg}`;
    if (nl.omit(obj, ["time", "level", "name", "msg"]).length > 0) {
      console.error(message, obj);
    } else {
      console.error(message);
    }
  },
  warn: (obj: Record<string, any>) => {
    const message = `[${obj.name}] ${obj.msg}`;
    if (nl.omit(obj, ["time", "level", "name", "msg"]).length > 0) {
      console.warn(message, obj);
    } else {
      console.warn(message);
    }
  },
};

export function getLogger(name: string) {
  const base = pino({
    name,
    browser: {
      asObject: false,
      write: customTransport,
    },
  });

  return base.child({ name });
}
