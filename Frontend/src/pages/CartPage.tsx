import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.length > 0 ? (
        <>
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
                    <Button
                      variant="contained"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Remove Item
                    </Button>
                  </Box>
                </Box>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Button
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          ))}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Typography variant="h4">
              Total Amount: {totalAmount} EGP
            </Typography>
            <Button variant="contained" onClick={() => handleClearCart()}>
              Clear Your Cart
            </Button>
          </Box>
        </>
      ) : (
        <Typography>Cart is empety. Please start shopping and add itemas first</Typography>
      )}
    </Container>
  );
};

export default CartPage;
