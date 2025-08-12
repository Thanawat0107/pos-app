import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  set: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("Failed to save to AsyncStorage", e);
    }
  },
  get: async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error("Failed to load from AsyncStorage", e);
      return null;
    }
  },
  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Failed to remove from AsyncStorage", e);
    }
  },
  // เผื่ออยากเก็บ JSON
  setJson: async <T>(key: string, value: T) => {
    try { await AsyncStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.error("Failed to save JSON to AsyncStorage", e); }
  },
  getJson: async <T>(key: string): Promise<T | null> => {
    try {
      const raw = await AsyncStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch (e) {
      console.error("Failed to load JSON from AsyncStorage", e);
      return null;
    }
  },
} as const;