import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import "../css/Cart.css";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
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

  const navigate = useNavigate();

  const handleCloseCart = () => {
    const cart = document.getElementById("cart");
    const overlay = document.getElementById("overlay");
    cart?.classList.remove("active-cart");
    overlay?.classList.remove("overlay-active");
  };

  return (
    <Box
      id="cart"
      className="cart "
      sx={{
        width: "40%",
        position: "fixed",
        height: "100vh",
        overflowY: "scroll",
        zIndex: 100,
        backgroundColor: "#1c1f22",
      }}
    >
      <Container sx={{ mt: 3 }}>
        <Box textAlign={"right"}>
          <Button onClick={handleCloseCart}>
            <CloseIcon />
          </Button>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          mb={5}
        >
          <Typography variant="h3" color="#fff">
            Your Cart
          </Typography>
          <Button color="error" onClick={() => handleClearCart()}>Clear Your Cart</Button>
        </Box>
        {cartItems.length > 0 ? (
          <>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              gap={3}
            >
              {cartItems.map((item) => (
                <Box key={item.productId} p={1} display={"flex"} gap={2} borderBottom={1} borderColor={"#cfcfcfff"} pb={4}>
                  <img src={item.image} height={150} width={150} alt="" />
                  <Box display={"flex"} flexDirection={"column"} gap={1}>
                    <Typography color={"#fff"} variant="h5">
                      {item.title}
                    </Typography>
                    <Typography color={"#cfcfcfff"}>
                      {item.unitPrice} EGP
                    </Typography>
                    <Box display={"flex"} alignItems={"center"}>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                      >
                        <Button
                          onClick={() =>
                            handleQuantity(item.productId, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <Button>
                          <Typography>{item.quantity}</Typography>
                        </Button>
                        <Button
                          onClick={() =>
                            handleQuantity(item.productId, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                      <Button onClick={() => handleRemoveItem(item.productId)}>
                        <DeleteIcon />
                      </Button>
                    </Box>
                    <Typography color={"#cfcfcfff"}>
                      <span style={{ fontWeight: "bold" }}>Total Price</span> :{" "}
                      {item.quantity * item.unitPrice} EGP
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Typography variant="h5" color="White" p={2}>
                <span style={{fontWeight:"bold"}}>Total Amount:</span> {totalAmount} EGP
              </Typography>
              <Button style={{width: "100%"}} variant="contained" onClick={() => navigate("/checkout")}>
                Checkout
              </Button>
            </Box>
          </>
        ) : (
          <Typography>
            Cart is empety. Please start shopping and add itemas first
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
