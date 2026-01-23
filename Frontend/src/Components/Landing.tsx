import { Box } from "@mui/material";
import landingBg from "../imgs/landing_Background.jpg";
import StartShopingButton from "./StartShopingButton";


const Landing = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${landingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        className="smgklfmdsklvbmkls"
        width={"100%"}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        position={"absolute"}
        top={"80%"}
      >
        <a href="#all-products" style={{textDecoration: "none", height: "fit-content"}}>
        <StartShopingButton title="Start Shopping" />
        </a>
      </Box>
    </Box>
  );
};

export default Landing;
