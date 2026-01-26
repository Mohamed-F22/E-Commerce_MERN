import { Box } from "@mui/material";
import "../css/overlay.css";
import { useRender } from "../Context/visibility/RenderContext";

const Overlay = () => {
  const { loginOff, registerOff, overlayOff } = useRender();
  const handleCloseCart = () => {
    document.getElementById("cart")?.classList.remove("active-cart");
    loginOff();
    registerOff();
    overlayOff()
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
