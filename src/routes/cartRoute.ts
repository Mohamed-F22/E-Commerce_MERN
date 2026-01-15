import Express from "express";
import { addItemToCart, getActiveCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = Express.Router()

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id 

  const cart = await getActiveCart({userId})  
  res.status(200).send(cart)
})

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id

  const {productId, quantity} = req.body

  const response = await addItemToCart({userId, productId, quantity})
  res.status(response.statusCode).send(response.data)
})

export default router