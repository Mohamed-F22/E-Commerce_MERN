import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/cartItems";
import type { backendProduct } from "../../types/backendProduct";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        return;
      }
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        setError("Failed to Fetch user Cart!");
      }
      const cart = await res.json();
      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
        }: {
          product: backendProduct;
          quantity: number;
        }) => ({
          productId: product._id,
          title: product.title,
          quantity: quantity,
          unitPrice: product.price,
          image: product.image,
        }),
      );
      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount)
    };
    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });
      if (!res.ok) {
        setError("Faild to add to cart!");
        console.log(error);
      }
      const cart = await res.json();      
      if (!cart) {
        setError("Failed to parse cart data");
        console.log(error);
      }
      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
        }: {
          product: backendProduct;
          quantity: number;
        }) => ({
          productId: product._id,
          title: product.title,
          quantity: quantity,
          unitPrice: product.price,
          image: product.image,
        }),
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
