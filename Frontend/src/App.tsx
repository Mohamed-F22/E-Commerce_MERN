import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./Context/Auth/AuthProvider";
import Cart from "./Components/Cart";
import ProtectedRoute from "./Components/ProtectedRoute";
import CartProvider from "./Context/Cart/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import "./App.css"
import { Box } from "@mui/material";
import Overlay from "./Components/Overlay";
import LoginForm from "./Components/LoginForm";
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <Box overflow={"hidden"} position={"relative"}>
          <Overlay/>
          <LoginForm/>
          <Cart/>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/myorders" element={<MyOrdersPage />} />
            </Route>
          </Routes>
          </Box>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
