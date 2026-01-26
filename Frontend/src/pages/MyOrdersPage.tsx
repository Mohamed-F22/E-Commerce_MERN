import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAuth } from "../Context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {
  const { orders, getUserOrders } = useAuth();

  useEffect(() => {
    getUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box mt={10} color={"#fff"}>
      <Container
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Your Orders</Typography>

        {orders.map((order) => (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-third">
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Product</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Unit Price</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Quantity</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "#ffffffff" }}>
                {order.orderItems.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.productTitle}</TableCell>
                    <TableCell>{item.unitPrice} EGP</TableCell>
                    <TableCell>{item.quantity} Piece</TableCell>
                    <TableCell>{item.quantity * item.unitPrice} EGP</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-third">
                  <TableCell
                    colSpan={2}
                    sx={{ fontWeight: "bold", color: "#fff", border: "none" }}
                  >
                    Order Address: {order.address.governorate} -{" "}
                    {order.address.town} - {order.address.details}
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    sx={{ fontWeight: "bold", color: "#fff", border: "none" }}
                  >
                    Total Summary: {order.totalAmount} EGP
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ))}
      </Container>
    </Box>
  );
};

export default MyOrdersPage;
