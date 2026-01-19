import { productModel } from "../models/ProductModel";

interface Product {
  title: string;
  image: string;
  price: number;
  stock: number
}

export const getAllProducts = async () => {
  return await productModel.find()
}

export const seedInitialProducts = async () => {
  try{
    const InitialProducts = [
      { title: "Dell labtop", image: "https://m.media-amazon.com/images/I/61ELco-59NL._AC_UF894,1000_QL80_.jpg", price: 15000, stock: 10 },
      { title: "Asus labtop", image: "https://m.media-amazon.com/images/I/61vafjrIjhL._AC_UF894,1000_QL80_.jpg", price: 40000, stock: 10 },
      { title: "HP labtop", image: "https://cdn.mos.cms.futurecdn.net/pyL3b8cis5dcmUvgbe9ygV.jpg", price: 25000, stock: 10 }
    ];
    const products = await getAllProducts()
    if (products.length === 0) {
      await productModel.insertMany(InitialProducts)
    }
  }catch (err) {
    console.error("Cannot Seed Database", err)
  }

}