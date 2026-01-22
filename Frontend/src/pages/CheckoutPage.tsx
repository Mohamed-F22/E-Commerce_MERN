import { Box, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalAmount, checkout } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const handleCheckout = () => {
    const address = addressRef.current?.value;
    if (!address) {
      console.log("Enter Your Adress!");
      return;
    }
    checkout(address)
    navigate("/")
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">Checkout</Typography>

      {cartItems.map((item) => (
        <Box key={item.productId} p={1}>
          <Box p={3} border={1} borderRadius={3} borderColor={"#c1c1c1"}>
            <Box width="100%" display={"flex"} alignItems={"center"} gap={5}>
              <img src={item.image} width={150} alt="" />
              <Box
                display="flex"
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width="100%"
              >
                <Typography variant="h5">{item.title}</Typography>
                <Typography>Unit Price : {item.unitPrice} EGP</Typography>
                <Typography>Quantity : {item.quantity} Units</Typography>
                <Typography>
                  Total Price : {item.quantity * item.unitPrice} EGP
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          width={"100%"}
          mt={2}
          mb={2}
        >
          <TextField
            sx={{ width: "60%" }}
            label="Your Address"
            variant="outlined"
            inputRef={addressRef}
          />
          <Typography width={"30%"} textAlign={"right"} variant="h5">
            Total Amount: {totalAmount} EGP
          </Typography>
        </Box>
        <Button variant="contained" onClick={handleCheckout} fullWidth>
          Confirm Order
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
