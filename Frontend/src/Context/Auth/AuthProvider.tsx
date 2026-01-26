import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "userName";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY),
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY),
  );
  const [orders, setOrders] = useState([]);

  const isAuthenticated = !!token;

  const login = (userName: string, token: string) => {
    setUserName(userName);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, userName);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUserName(null);
    setToken(null);
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
    console.log(data);

    setOrders(data);
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        token,
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
