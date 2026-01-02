import { cartModel } from "../models/cartModel"

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
  let cart = await cartModel.find({userId, status: "active"})

  if (!cart) {
    let cart = await createCartForUser({userId})
    return cart
  }

  return cart
}