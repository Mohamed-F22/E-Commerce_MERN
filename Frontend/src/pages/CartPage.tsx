import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";

const CartPage = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState();
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
      const data = await res.json();
      setCart(data);
    };
    fetchCart();
  }, [token]);

  if (error) {
    return <Box>"Something Went Wrong, Please Try Again!"</Box>;
  }

  console.log(cart);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
    </Container>
  );
};

export default CartPage;
