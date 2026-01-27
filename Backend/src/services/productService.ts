import { productModel } from "../models/ProductModel";

interface Product {
  title: string;
  image: string;
  price: number;
  stock: number;
  desc: string;
}

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const InitialProducts = [
      {
        title: "Dell labtop",
        image: "https://i.ibb.co/vCPw6Fp2/b-Create-image-to-dell.png",
        price: 15000,
        stock: 10,
        desc: "Well-built laptops focused on productivity, strong support, and business-class reliability.",
      },
      {
        title: "Asus labtop",
        image: "https://i.ibb.co/kgqvx8qj/a-Create-image-to-Asus.webp",
        price: 40000,
        stock: 10,
        desc: "Innovative laptops offering powerful performance, sleek designs, and great value for money.",
      },
      {
        title: "HP labtop",
        image: "https://i.ibb.co/LzCGVwPb/b-Create-image-to-hp-l.png",
        price: 25000,
        stock: 10,
        desc: "Reliable everyday laptops known for solid performance, durability, and wide availability.",
      },
    ];
    const products = await getAllProducts();
    if (products.length === 0) {
      await productModel.insertMany(InitialProducts);
    }
  } catch (err) {
    console.error("Cannot Seed Database", err);
  }
};
