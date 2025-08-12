import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { storage } from './storageHelper';

const CART_TOKEN_KEY = 'cartToken';

export const getCartToken = async (): Promise<string> => {
  let token = await storage.get(CART_TOKEN_KEY);
  if (!token || !token.trim()) {
    token = uuidv4();
    await storage.set(CART_TOKEN_KEY, token);
  }
  return token;
};