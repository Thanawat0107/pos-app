import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../@types/dto/CartItem";

interface ShoppingCartState {
  cartItems: CartItem[];
}

const initialState: ShoppingCartState = {
  cartItems: [],
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    upsertItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index === -1) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[index] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; delta: number }>
    ) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.delta;
        if (item.quantity < 1) {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload.id
          );
        }
      }
    },
  },
});

export const { setCart, upsertItem, removeItem, clearCart, updateQuantity } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
