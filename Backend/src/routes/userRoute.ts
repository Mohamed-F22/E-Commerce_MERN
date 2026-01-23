import Express from "express";
import { getUserOrders, login, register } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = Express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await register({ firstName, lastName, email, password });
    res.status(result.statusCode).json(result.data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.status(result.statusCode).json(result.data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});

router.get("/orders", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const response = await getUserOrders({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});

export default router;
