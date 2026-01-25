import { Box } from "@mui/material";
import "../css/overlay.css";

const Overlay = () => {
  const handleCloseCart = () => {
    document.getElementById("overlay")?.classList.remove("overlay-active");

    document.getElementById("cart")?.classList.remove("active-cart");

    document.getElementById("login-form")?.classList.remove("active-login");

    document
      .getElementById("register-form")
      ?.classList.remove("active-register");
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
