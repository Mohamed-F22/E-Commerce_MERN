import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar";
import AuthProvider from "./Context/Auth/AuthProvider";
import Cart from "./Components/Cart";
import ProtectedRoute from "./Components/ProtectedRoute";
import CartProvider from "./Context/Cart/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import "./App.css";
import { Box } from "@mui/material";
import RenderProvider from "./Context/visibility/RenderProvider";
import AuthModals from "./Context/visibility/AuthModals";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RenderProvider>
        <BrowserRouter>
          <Box overflow={"hidden"} position={"relative"}>
            <AuthModals />
            <Cart />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/myorders" element={<MyOrdersPage />} />
              </Route>
            </Routes>
          </Box>
        </BrowserRouter>
        </RenderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
