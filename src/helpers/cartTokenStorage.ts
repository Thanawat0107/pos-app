import { storage } from "./storageHelper";

export const CART_TOKEN_KEY = "cartToken";
export const TAG_TOKEN_KEY = "orderTag";

export const getCartToken = async (): Promise<string> => {
  const token = await storage.get(CART_TOKEN_KEY);
  if (!token) throw new Error("No cart token found. Please start order first.");
  return token;
};

export const setCartToken = async (token: string) => {
  await storage.set(CART_TOKEN_KEY, token);
};

export const clearCartToken = async () => {
  await storage.remove(CART_TOKEN_KEY);
};
