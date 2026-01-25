import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const LoginForm = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Check Submitted Data!");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    if (!response.ok) {
      setError("Unable to Login user, please try different credientials!");
      return;
    }
    const token = await response.json();
    if (!token) {
      setError("Incorrect Token!");
      return;
    }
    login(email, token);
    navigate("/");

    const loginForm = document.getElementById("login-form");
    loginForm?.classList.remove("active-login");

    const overlay = document.getElementById("overlay");
    overlay?.classList.remove("overlay-active");

    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };
  return (
    <Box
      className="login "
      position={"fixed"}
      top={"50%"}
      left={"50%"}
      sx={{
        backgroundColor: "#1c1f22",
      }}
      p={5}
      borderRadius={5}
      id="login-form"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography color="#fff" variant="h4">
          Login to your Account
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        >
          <TextField
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #222b36 inset",
                WebkitTextFillColor: "white !important",
                transition: "background-color 5000s ease-in-out 0s",
              },
            }}
            inputRef={emailRef}
            label="Email"
            name="email"
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Login
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
