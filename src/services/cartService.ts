import { cartModel, Icart, ICartItem } from "../models/cartModel"
import { productModel } from "../models/ProductModel";

interface createCartForUser {
  userId: string;
}

export const createCartForUser =  async ({userId} : createCartForUser) => {
  const cart = await cartModel.create({userId, totalAmount: 0})
  await cart.save()
  
  return cart
}

interface getActiveCart {
  userId: string;
}

export const getActiveCart = async ({userId} : getActiveCart) => {
  let cart = await cartModel.findOne({userId, status: "active"})

  if (!cart) {
    let cart = await createCartForUser({userId})
    return cart
  }

  return cart
}

interface addItemToCart {
  productId: any,
  quantity: number,
  userId: string
}

export const addItemToCart = async ({userId, productId, quantity}: addItemToCart) => {
  const cart = await getActiveCart({userId})  

  const existsInCart = cart.items.find((p) => p.product.toString() === productId.toString());

  if (existsInCart) {
    return {data: "Item already exists in the cart!", statusCode: 400}
  }

  const product = await productModel.findById(productId)

  if(!product) {
    return {data: "Product not found!", statusCode: 400}
  }

  if (quantity > product.stock) {
    return {data: "This quantity is not provided!", statusCode: 400}
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity
  })

  cart.totalAmount += product.price * quantity

  const updatedData = await cart.save()
  return {data: updatedData, statusCode: 200}
}

interface updateItemInCart {
  productId: any,
  quantity: number,
  userId: string
}

export const updateItemInCart = async ({userId, productId, quantity}: updateItemInCart) => {
  const cart = await getActiveCart({userId})

  const existsInCart = cart.items.find((p) => p.product.toString() === productId.toString())  

  if (!existsInCart) {
    return {data: "Item dose not exist in cart!", statusCode: 400}
  }

  const product = await productModel.findById(productId)

  if(!product) {
    return {data: "Product not found!", statusCode: 400}
  }

  if (quantity > product.stock) {
    return {data: "This quantity is not provided!", statusCode: 400}
  }

  const otherCartItems = cart.items.filter(((p) => p.product.toString() !== productId))

  let total = calculateCartItems({cartItems: otherCartItems})

  existsInCart.quantity = quantity

  total += existsInCart.quantity * existsInCart.unitPrice
  cart.totalAmount = total

  const updatedData = await cart.save()
  return {data: updatedData, statusCode: 200}
}

interface deleteItemFromCart {
  productId: any,
  userId: string
}

export const deleteItemFromCart = async ({userId, productId}: deleteItemFromCart) => {
  const cart = await getActiveCart({userId})
  
  const existsInCart = cart.items.find((p) => p.product.toString() === productId.toString())  
  
  if (!existsInCart) {
    return {data: "Item dose not exist in cart!", statusCode: 400}
  }

  const filteredItems = cart.items.filter(((p) => p.product.toString() !== productId))
  
  const total = calculateCartItems({cartItems: filteredItems})

  cart.items = filteredItems
  cart.totalAmount = total

  const updatedData = await cart.save()
  return {data: updatedData, statusCode: 200}
}

const calculateCartItems = ({cartItems}: {cartItems: ICartItem[]}) => {  
  let total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice
    return sum
  }, 0)

  return total
}

export const ClearCart = async ({userId}: {userId: string}) => {
  const cart = await getActiveCart({userId})
  
  cart.items = []
  cart.totalAmount = 0
  
  const updatedData = await cart.save()
  return {data: updatedData, statusCode: 200}
}