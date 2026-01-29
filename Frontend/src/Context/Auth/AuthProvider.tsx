import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "userName";
const EMAIL_KEY = "email";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem(EMAIL_KEY),
  );
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY),
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY),
  );
  const [orders, setOrders] = useState([]);

  const isAuthenticated = !!token;

  const login = (email: string, token: string, userName: string) => {
    setEmail(email);
    setToken(token);
    setUserName(userName)
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, userName);
  };

  const logout = () => {
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    setEmail(null);
    setToken(null);
    setUserName(null);
  };
  const getUserOrders = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log("Failed to get your orders!");
      return;
    }
    const data = await res.json();
    setOrders(data);
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        token,
        userName,
        orders,
        isAuthenticated,
        login,
        logout,
        getUserOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
