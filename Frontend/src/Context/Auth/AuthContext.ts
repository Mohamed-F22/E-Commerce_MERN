import { createContext, useContext } from "react";

interface AuthContextType {
  userName: string | null;
  token: string | null;
  login: (userName: string, token: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userName: null,
  token: null,
  login: () => {},
  isAuthenticated: false,
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);
