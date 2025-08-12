import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { storage } from './storageHelper';

const CART_TOKEN_KEY = "cartToken";

let inMemoryToken: string | null = null;
let pending: Promise<string> | null = null;

export const getCartToken = async (): Promise<string> => {
  if (inMemoryToken) return inMemoryToken;
  if (pending) return pending;

   pending = (async () => {
    let token = await storage.get(CART_TOKEN_KEY);
    if (!token || !token.trim()) {
      token = uuidv4();
      await storage.set(CART_TOKEN_KEY, token);
    }
    inMemoryToken = token;
    pending = null;
    return token;
  })();

  return pending;
};

export const setCartToken = async (token: string) => {
  inMemoryToken = token;
  await storage.set(CART_TOKEN_KEY, token);
};

export const clearCartToken = async () => {
  inMemoryToken = null;
  await storage.remove(CART_TOKEN_KEY);
};