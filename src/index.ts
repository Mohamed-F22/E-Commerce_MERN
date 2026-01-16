import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import { seedInitialProducts } from "./services/productService.js"
import cartRoute from "./routes/cartRoute.js"

dotenv.config()

const app = express()
const port = 3001

app.use(express.json())

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("Connection faild", err))

// seed initial products to database
seedInitialProducts()

app.use("/user", userRoute)
app.use("/product", productRoute)
app.use("/cart", cartRoute)

app.listen(port, () => {
  console.log(`server is runing at: mongodb://localhost:${port}`);
})