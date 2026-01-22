import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CartPage = () => {
  const { cartItems, totalAmount } = useCart();
  console.log(totalAmount);  

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Box key={item.productId} p={1}>
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={3}
            border={1}
            borderRadius={3}
            borderColor={"#c1c1c1"}
          >
            <Box display={"flex"} alignItems={"center"} gap={5}>
              <img src={item.image} width={150} alt="" />
              <Box textAlign={"center"}>
                <Typography variant="h5">{item.title}</Typography>
                <Typography>
                  {item.quantity} x {item.unitPrice} EGP
                </Typography>
                <Button variant="contained">Remove Item</Button>
              </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button>-</Button>
              <Button>+</Button>
            </ButtonGroup>
          </Box>
        </Box>
      ))}
      <Box>
        <Typography variant="h4">Total Amount: {totalAmount} EGP</Typography>
      </Box>
    </Container>
  );
};

export default CartPage;
