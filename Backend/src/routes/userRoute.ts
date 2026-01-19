import Express from "express";
import { login, register } from "../services/userService";

const router = Express.Router()

router.post("/register", async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body
    const result = await register({firstName, lastName, email, password})
    res.status(result.statusCode).json(result.data)
  }catch (err) {
    res.status(500).send("Something Went Wrong!")
  }
})

router.post ("/login", async(req, res) => {
  try {
    const { email, password} = req.body
    const result = await login({email, password})
    res.status(result.statusCode).json(result.data)
  }catch (err) {
    res.status(500).send("Something Went Wrong!")
  }
})

export default router