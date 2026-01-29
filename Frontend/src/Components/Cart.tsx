import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import "../css/Cart.css";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRender } from "../Context/visibility/RenderContext";
import Swal from "sweetalert2";

const Cart = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();

  const { overlayOff } = useRender();

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#9c27b0",
      confirmButtonText: "Yes, Clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cart has been cleared!",
          icon: "success",
        });
        clearCart();
      }
    });
  };

  const navigate = useNavigate();

  const handleCloseCart = () => {
    const cart = document.getElementById("cart");
    cart?.classList.remove("active-cart");
    overlayOff();
  };

  const handleGoToCheckout = () => {
    const cart = document.getElementById("cart");
    cart?.classList.remove("active-cart");
    overlayOff();
    navigate("/checkout");
  };

  return (
    <Box
      id="cart"
      className="cart"
      sx={{
        width: {
          xs: "80%",
          sm: "70%",
          md: "50%",
        },
        transition: "0.5s",
        position: "fixed",
        height: "100vh",
        overflowY: "scroll",
        overflowX:"hidden",
        zIndex: 100,
        backgroundColor: "#1c1f22",
      }}
    >
      <Container sx={{pt: 3, pb: 3}} >
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
          <Typography
            sx={{
              fontSize: {
                xs: 30,
                sm: 40,
              },
            }}
            variant="h3"
            color="#fff"
          >
            Your Cart
          </Typography>
          <Button color="error" onClick={() => handleClearCart()}>
            <DeleteIcon />
          </Button>
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
                <Box
                  key={item.productId}
                  p={1}
                  display={"flex"}
                  borderBottom={1}
                  borderColor={"#cfcfcfff"}
                  pb={4}
                  sx={{gap: {
                    xs: 1,
                    sm: 2
                  }}}
                >
                  <Box component={"img"} src={item.image} sx={{width: {xs: 90, sm: 150, lg:180}, height:{xs:90,sm: 150, lg:180}}} alt="" />
                  <Box display={"flex"} flexDirection={"column"} sx={{gap: {xs:0, sm:1}}}>
                    <Typography color={"#fff"} variant="h5" sx={{fontSize:{xs: 16,sm: 25}}}>
                      {item.title}
                    </Typography>
                    <Typography color={"#cfcfcfff"} sx={{fontSize:{xs: 14,sm: 25}}}>
                      {item.unitPrice} EGP
                    </Typography>
                    <Box display={"flex"} alignItems={"center"}>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                        size="small"
                        
                      >
                        <Button
                          onClick={() =>
                            handleQuantity(item.productId, item.quantity - 1)
                          }
                          sx={{p:0}}
                          
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
                    <Typography sx={{fontSize:{xs: 14,sm: 25}}} color={"#cfcfcfff"}>
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
              <Typography variant="h5" color="White" sx={{fontSize:{xs: 18,sm: 25}}} p={2}>
                <span style={{ fontWeight: "bold" }}>Total Amount:</span>{" "}
                {totalAmount} EGP
              </Typography>
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="secondary"
                onClick={handleGoToCheckout}
              >
                Checkout
              </Button>
            </Box>
          </>
        ) : (
          <>
            {" "}
            <Typography variant="h5" color="#fff">
              Cart is empety.
            </Typography>
            <Typography color="#cfcfcfff">
              Please start shopping and add itemas first
            </Typography>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
