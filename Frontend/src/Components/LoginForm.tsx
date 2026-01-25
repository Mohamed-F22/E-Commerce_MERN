import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form"; // استيراد المكتبة
import "../css/login.css";

// تعريف أنواع البيانات للمدخلات
interface ILoginInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // تهيئة react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginInput>();

  // الدالة التي يتم استدعاؤها عند نجاح التحقق من البيانات
  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    setServerError(""); // تصغير الخطأ السابق

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data), // إرسال الداتا مباشرة
        },
      );

      if (!response.ok) {
        setServerError(
          "Incorrect Email or Password!",
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

      // إغلاق المودال أو الأوفرلاي (يفضل استخدام State هنا بدلاً من الـ DOM مباشرة)
      document.getElementById("login-form")?.classList.remove("active-login");
      document.getElementById("overlay")?.classList.remove("overlay-active");

      reset(); // تفريغ الحقول بعد النجاح
    } catch {
      setServerError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Box
      className="login"
      position={"fixed"}
      top={"50%"}
      left={"50%"}
      sx={{ backgroundColor: "#1c1f22" }}
      p={5}
      borderRadius={5}
      id="login-form"
      component="form" // تحويل الـ Box إلى form
      onSubmit={handleSubmit(onSubmit)}
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
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
          }}
        >
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
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #222b36 inset",
                WebkitTextFillColor: "white !important",
                transition: "background-color 5000s ease-in-out 0s",
              },
            }}
            label="Email"
          />

          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: { value: 3, message: "Min length is 3" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            label="Password"
          />

          <Button type="submit" variant="contained">
            Login
          </Button>

          {serverError && (
            <Typography sx={{ color: "red", textAlign: "center" }}>
              {serverError}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
