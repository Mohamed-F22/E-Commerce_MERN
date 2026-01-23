import { Box, Container, Typography } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import type { Product } from "../types/types";

const Collection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/product`,
        );
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  });

  if (error) {
    return <Box>"Something Went Wrong, Please Try Again!"</Box>;
  }
  return (
    <Box className="bg-secondary" sx={{ pt: 10, pb: 10 }}>
      <Container >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={3}
        >
          <Typography
            color="#ffffffff"
            fontFamily={'"Special Gothic Expanded One", sans-serif;'}
            fontSize={"35px"}
            lineHeight={1}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            We believe in the power of technology
          </Typography>
          <Grid container>
            <Grid p={2} size={{ md: 6 }}>
              <Typography p={2} color="#cfcfcfff" fontSize={"22px"}>
                At Tech Zone, we are more than just a laptop store. We provide
                cutting-edge devices that combine{" "}
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  {" "}
                  powerful performance
                </span>
                , sleek design, and reliable quality. Our mission is to support
                students, professionals, and creators with laptops that help
                them achieve more without compromise.
              </Typography>
              <Typography p={2} color="#cfcfcfff" fontSize={"22px"}>
                We offer a wide range of laptops from everyday devices to high
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  {" "}
                  performance machines
                </span>{" "}
                for work, design, and gaming ensuring a smooth and powerful
                experience in every moment.
              </Typography>
            </Grid>
            <Grid p={2} size={{ md: 6 }}>
              <img
                src="https://i.ibb.co/xtRJ2Z7V/b-Create-image-to-Asus.png"
                width={"100%"}
                height={"100%"}
                alt=""
              />
            </Grid>
          </Grid>
        </Box>
        <Box id="all-products">
          <Box p={6}>
            <Typography
              fontFamily={'"Special Gothic Expanded One", sans-serif;'}
              fontSize={"35px"}
              fontWeight={"bold"}
              variant="h3"
              color="#fff"
            >
              Our Collection
            </Typography>
            <span
              style={{
                display: "block",
                color: "#cfcfcfff",
                fontSize: 18,
                fontWeight: "200",
              }}
            >
              We believe in the power of technology to make life easier and work
              more efficient.
            </span>
          </Box>
          <Grid container spacing={2}>
            {products.map((p) => {
              return (
                <Grid key={p._id} size={{ md: 4 }} p={2}>
                  <ProductCard {...p} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Collection;
