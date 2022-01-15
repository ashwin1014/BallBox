import AsyncStorage from '@react-native-async-storage/async-storage';
import RNAsyncStorageFlipper from 'rn-async-storage-flipper';

RNAsyncStorageFlipper(AsyncStorage);

const storeLocalData = async (key: string, value: string): Promise<void> => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

const retrieveLocalData = async (
  key: string,
): Promise<string | null | undefined> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(error);
  }
};

const importAllLocalData = async (): Promise<void> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    // @ts-ignore
    return result.map(req => JSON.parse(req)).forEach(console.log);
  } catch (error) {
    console.error(error);
  }
};

const removeItemFromLocalData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (exception) {
    console.error(exception);
  }
};

const clearAllLocalData = async (): Promise<void> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing app data.');
  }
};

export default AsyncStorage;
export {
  storeLocalData,
  retrieveLocalData,
  importAllLocalData,
  removeItemFromLocalData,
  clearAllLocalData,
};
