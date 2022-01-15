import {useCallback, useState} from 'react';

/**
 * `useToggle` returns a tuple of two values: the current value of the boolean and a function that
toggles the value.
 * @param {boolean} initialValue - the initial value of the state
 * @returns The value of the state and the function to toggle it.
 */
const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);

  return [value, toggle];
};

export default useToggle;
