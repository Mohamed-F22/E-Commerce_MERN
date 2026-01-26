import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../css/register.css";
import { useRender } from "../Context/visibility/RenderContext";

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
          "Unable to register user, please try different credentials!",
        );
        return;
      }

      const token = await response.json();

      if (!token) {
        setServerError("Incorrect Token!");
        return;
      }

      login(data.email, token);
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
      sx={{ backgroundColor: "#1c1f22" }}
      zIndex={100}
      p={5}
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
        <Typography color="#fff" variant="h4" mb={2}>
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
            />
            <TextField
              {...register("lastName", { required: "Required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              label="Last Name"
              fullWidth
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
                WebkitBoxShadow: "0 0 0 1000px #222b36 inset",
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
          />

          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Create Account
          </Button>

          <Link
            sx={{ cursor: "pointer", textAlign: "center" }}
            onClick={handleGoToLogin}
            underline="hover"
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
