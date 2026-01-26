import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../Context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {
  const { orders, getUserOrders } = useAuth();

  useEffect(() => {
    getUserOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Container
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">Your Orders</Typography>
      {orders.map((order) => (
        <Box
          key={order.orderId}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={1}
          border={1}
          borderColor={"#d1d1d1ff"}
          padding={3}
          borderRadius={3}
        >
          <Box               borderBottom={1}
              borderColor={"#d1d1d1ff"}>
          {order.orderItems.map((item) => (
            <Box
              key={item.productId}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              width={"100%"}

            >
              <Typography variant="h6">{item.productTitle}</Typography>
              <Typography>Quantity : {item.quantity}</Typography>
              <Typography>Unit Price : {item.unitPrice}</Typography>
              <Typography>
                Total Price : {item.unitPrice * item.quantity}
              </Typography>
            </Box>
          ))}</Box>
          <Box display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              width={"100%"}
              color={"#1976d2"}
              >
            <Typography fontWeight={"bold"}>Total Amount: {order.totalAmount}</Typography>
            <Typography fontWeight={"bold"}>Address: {order.address.governorate}</Typography>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default MyOrdersPage;
