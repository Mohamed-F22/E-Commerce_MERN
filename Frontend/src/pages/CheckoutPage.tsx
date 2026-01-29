import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import type { IAddress } from "../types/order";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      governorate: "",
      town: "",
      zipCode: "",
      details: "",
      notes: "",
    },
  });
  const { cartItems, totalAmount, checkout } = useCart();
  const navigate = useNavigate();

  const onSubmit = (data: IAddress) => {
    Swal.fire({
      title: "Confirm Order",
      text: `Your order will arrive on:"${data.governorate} - ${data.town} - ${data.details}"`,
      showCancelButton: true,
      confirmButtonColor: "#9c27b0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Order",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order confirmed",
          text: "We are happy that you chose us",
          showConfirmButton: false,
          timer: 1500,
        });
        checkout(data);
        navigate("/");
      }
    });
  };
  const textFieldStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },

      "& input:-webkit-autofill, & textarea:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #282c34 inset",
        WebkitTextFillColor: "white",
        transition: "background-color 5000s ease-in-out 0s",
      },
    },
    "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
    "& .MuiFormHelperText-root": { color: "#ff8a80" },
  };

  return (
    <Box className="bg-secondary" minHeight={"100vh"} sx={{ pt: 10, pb: 5 }}>
      <Container>
        <Typography variant="h3" color="#fff">
          Checkout
        </Typography>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box p={5} pl={0}>
              <Typography variant="h4" sx={{ color: "white", mb: 2 }}>
                Order Items
              </Typography>
              {cartItems.map((item) => (
                <Box key={item.productId} p={1}>
                  <Box>
                    <Grid container>
                      <Grid size={{xs: 12, sm: 5}}>
                        <Typography color="#fff" variant="h5">
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid color={"#cfcfcfff"} size={{xs: 12, sm: 7}}>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          width={"100%"}
                        >
                          <Typography
                            sx={{
                              fontSize: {
                                xs: 15,
                                sm: 18,
                              },
                            }}
                          >
                            {item.quantity} Units
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: {
                                xs: 15,
                                sm: 18,
                              },
                            }}
                          >
                            Total Price: {item.quantity * item.unitPrice} EGP
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid width={"100%"} size={{ md: 6 }}>
            {" "}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              display="flex"
              flexDirection="column"
              pl={0}
              sx={{ backgroundColor: "transparent", pt: 4 }}
            >
              <Typography variant="h4" sx={{ color: "white", mb: 2 }}>
                Shipping Details
              </Typography>
              <Grid container>
                <Grid size={{ xs: 12,sm:4 }}>
                  <Box sx={{pr:{sm:1}}}>
                  <Controller
                    name="governorate"
                    control={control}
                    rules={{ required: "Governorate is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Governorate"
                        variant="outlined"
                        fullWidth
                        sx={textFieldStyle}
                        error={!!errors.governorate}
                        helperText={errors.governorate?.message}
                      />
                    )}
                  /></Box>
                </Grid>
                <Grid size={{ xs: 12 ,sm:4}}>
                  <Box sx={{pr:{sm:1}}}>
                  <Controller
                    name="town"
                    control={control}
                    rules={{ required: "Town is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Town / City"
                        variant="outlined"
                        fullWidth
                        sx={textFieldStyle}
                        error={!!errors.town}
                        helperText={errors.town?.message}
                      />
                    )}
                  /></Box>
                </Grid>
                <Grid size={{ xs: 12,sm:4 }}>
                  <Controller
                    name="zipCode"
                    control={control}
                    rules={{ required: "ZIP Code is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ZIP Code"
                        variant="outlined"
                        fullWidth
                        sx={textFieldStyle}
                        error={!!errors.zipCode}
                        helperText={errors.zipCode?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Controller
                name="details"
                control={control}
                rules={{ required: "Details are required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address Details"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    sx={textFieldStyle}
                    error={!!errors.details}
                    helperText={errors.details?.message}
                  />
                )}
              />

              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Notes (Optional)"
                    variant="outlined"
                    fullWidth
                    sx={textFieldStyle}
                  />
                )}
              />

              <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
                Total Amount: {totalAmount} EGP
              </Typography>

              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                fullWidth
                sx={{ fontWeight: "bold" }}
              >
                Confirm Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
