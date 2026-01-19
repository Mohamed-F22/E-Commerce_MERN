import { Box, Container } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import type { Product } from "../types/types";

const HomePage = () => {
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
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => {
          return (
            <Grid key={p._id} size={{ md: 4 }}>
              <ProductCard {...p} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default HomePage;
