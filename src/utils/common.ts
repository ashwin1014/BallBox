/**
 * @summary Console logs info only on DEV mode.
 * @param {string} message - Message to log.
 * @param {string} key - optional key to identify the message
 * @param {string} type - type of error ('log' | 'info' | 'error' | 'warn')
 */
const consoleLogger = ({
  type = 'log',
  key,
  message,
  color,
}: {
  type?: 'info' | 'error' | 'log';
  key?: string;
  message: string | undefined | number | boolean | object;
  color?: string;
}): void => {
  if (__DEV__) {
    if (color) {
      console[type](`%c${key}`, `color: ${color};`, message);
    } else {
      console[type](key, message);
    }
  }
};

const times = (num: number) => {
  return [...Array(num).keys()];
};

const uniqueObjArray = <T>(
  arr: Array<T | any>,
  prop = 'id',
): Array<T | any> => {
  const newArr = Array.from(new Set(arr.map(a => a[prop]))).map(item => {
    return arr.find(a => a[prop] === item);
  });

  return newArr;
};

const isEmpty = (obj: any): boolean =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

const noop: () => void = () => {};

export {consoleLogger, times, uniqueObjArray, isEmpty, noop};
