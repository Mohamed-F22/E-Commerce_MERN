import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../css/register.css";
import { useRender } from "../Context/visibility/RenderContext";
import { jwtDecode } from "jwt-decode";

interface IRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loginOn, registerOff, overlayOff, overlayOn } = useRender();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterInput>();

  const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
    setServerError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setServerError(
          "This email is already registered. Please use a different email.",
        );
        return;
      }

      const token = await response.json();

      if (!token) {
        setServerError("Incorrect Token!");
        return;
      }
      interface MyTokenPayload {
        firstName: string;
        lastName: string;
        email: string;
      }

      const decoded = jwtDecode<MyTokenPayload>(token);
      const userName = `${decoded.firstName} ${decoded.lastName}`;

      login(data.email, token, userName);
      navigate("/");

      registerOff();
      overlayOff();

      reset();
    } catch {
      setServerError("Something went wrong. Please try again later.");
    }
  };

  const handleGoToLogin = () => {
    registerOff();
    loginOn();
    overlayOn();
  };

  return (
    <Box
      className="register"
      position={"fixed"}
      top={"50%"}
      left={"50%"}
      sx={{ backgroundColor: "#1c1f22", zIndex: 100, p: {xs: 3, sm:5}, width: {xs: "70%", sm: "60%", md: "30%"}}}
      borderRadius={5}
      id="register-form"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography sx={{fontSize:{xs: 25, sm: 35, md: 30, lg: 35}}} color="#fff" variant="h4" mb={2}>
          Register New Account
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              {...register("firstName", { required: "Required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              label="First Name"
              fullWidth
              sx={{
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #1c1f22 inset",
                  WebkitTextFillColor: "white !important",
                },
              }}
            />
            <TextField
              {...register("lastName", { required: "Required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              label="Last Name"
              fullWidth
              sx={{
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #1c1f22 inset",
                  WebkitTextFillColor: "white !important",
                },
              }}
            />
          </Box>

          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            label="Email"
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #1c1f22 inset",
                WebkitTextFillColor: "white !important",
              },
            }}
          />

          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min length is 6" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            label="Password"
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #1c1f22 inset",
                WebkitTextFillColor: "white !important",
              },
            }}
          />

          <Button type="submit" color="secondary" variant="contained" sx={{ mt: 1 }}>
            Create Account
          </Button>

          <Link
            sx={{ cursor: "pointer" }}
            onClick={handleGoToLogin}
            underline="hover"
            color="secondary"
          >
            Already have an account? Login
          </Link>

          {serverError && (
            <Typography sx={{ color: "red", textAlign: "center", mt: 1 }}>
              {serverError}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
