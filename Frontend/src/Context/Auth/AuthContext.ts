import { createContext, useContext } from "react";
import type { Order } from "../../types/order";

interface AuthContextType {
  userName: string | null;
  token: string | null;
  orders: Order[];
  login: (userName: string, token: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
  getUserOrders: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userName: null,
  token: null,
  orders: [],
  login: () => {},
  isAuthenticated: false,
  logout: () => {},
  getUserOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
