import { Box } from "@mui/material";
import "../css/overlay.css";

const Overlay = () => {
  const handleCloseCart = () => {
    const overlay = document.getElementById("overlay");
    overlay?.classList.remove("overlay-active");
    
    const cart = document.getElementById("cart");
    cart?.classList.remove("active-cart");

    const loginForm = document.getElementById("login-form");
    loginForm?.classList.remove("active-login");
  };

  return (
    <Box
      onClick={handleCloseCart}
      className="overlay"
      id="overlay"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    ></Box>
  );
};

export default Overlay;
