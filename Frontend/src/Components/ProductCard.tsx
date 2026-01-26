import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { Product } from "../types/types";
import { useCart } from "../Context/Cart/CartContext";
import { useAuth } from "../Context/Auth/AuthContext";
import { useRender } from "../Context/visibility/RenderContext";
import { Toast } from "./alert";

export default function ProductCard({
  _id,
  title,
  price,
  image,
  stock,
  desc,
}: Product) {
  const { isAuthenticated } = useAuth();
  const { loginOn, overlayOn } = useRender();

  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addItemToCart(_id);
    } else {
      loginOn();
      overlayOn();
      Toast.fire({
        icon: "warning",
        title: "Login to Your Account First!",
      });
    }
  };

  return (
    <Card sx={{ background: "transparent", color: "#fff" }}>
      <CardMedia sx={{ height: 300 }} image={image} title="green iguana" />
      <CardContent sx={{ m: 0 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          m={0}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {title}{" "}
          <span style={{ fontSize: 12, color: "#cfcfcfff" }}>
            stock ({stock})
          </span>
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#cfcfcfff" }}>
          {desc}
        </Typography>
        <Typography variant="body2">{price} EGP</Typography>
      </CardContent>
      <CardActions>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
