import { createContext, useContext } from "react";
import type { CartItem } from "../../types/cartItems";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantity: number) => void,
  removeItemFromCart: (ProductId: string) => void,
  clearCart: () => void,
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
