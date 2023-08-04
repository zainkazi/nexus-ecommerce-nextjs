import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartTypes } from "./types/AddCartTypes";

type CartItem = {
  name: string;
  id: string;
  images?: string[];
  description?: string;
  unit_amount: number;
  quantity: number;
};

type CartState = {
  isOpen: boolean;
  cart: AddCartTypes[];
  paymentIntent: string;
  onCheckout: string;
  clearCart: () => void;
  toggleCart: () => void;
  addProduct: (item: AddCartTypes) => void;
  removeProduct: (item: AddCartTypes) => void;
  setPaymentIntent: (val: string) => void;
  setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      onCheckout: "cart",

      clearCart: () => set(() => ({ cart: [] })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem && existingItem.quantity > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );
            return { cart: filteredCart };
          }
        }),
      setPaymentIntent: (val) => set(() => ({ paymentIntent: val })),
      setCheckout: (val) => set(() => ({ onCheckout: val })),
    }),
    { name: "cartStore" }
  )
);

type ThemeStoreTypes = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeStoreTypes>()(
  persist(
    (set) => ({
      mode: "dark",
      toggleMode: (theme) => set(() => ({ mode: theme })),
    }),
    { name: "theme-store" }
  )
);
