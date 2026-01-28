import { createContext, useContext } from "react";
import type { Order } from "../../types/order";

interface AuthContextType {
  email: string | null;
  token: string | null;
  userName: string | null;
  orders: Order[];
  login: (email: string ,userName: string, token: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
  getUserOrders: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  email: null,
  token: null,
  userName: null,
  orders: [],
  login: () => {},
  isAuthenticated: false,
  logout: () => {},
  getUserOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
