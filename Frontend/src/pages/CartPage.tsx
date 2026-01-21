import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useCart } from "../Context/Cart/CartContext";

const CartPage = () => {
  const { cartItems, totalAmount } = useCart();
  const [error, setError] = useState("");

  if (error) {
    return <Box>"Something Went Wrong, Please Try Again!"</Box>;
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Box>{item.title}</Box>
      ))}
    </Container>
  );
};

export default CartPage;
