import Express from "express";
import { getActiveCart } from "../services/cartService";
import validateJWT, { ExtendRequest } from "../middlewares/validateJWT";

const router = Express.Router()

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id

  const cart = await getActiveCart({userId})
  res.status(200).send(cart)
})

export default router