import mongoose, {Schema, Document} from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
  desc: string
}

const productSchema = new Schema<IProduct> ({
  title: {type: String, required: true},
  image: {type: String, required: true},
  price: {type: Number, required: true},
  stock: {type: Number, default: 0},
  desc: {type: String}
})

export const productModel = mongoose.model<IProduct>("product", productSchema)