import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface IOrderItem {
  productTitle: string,
  productImage: string,
  unitPrice: number,
  quantity: number
}

export interface IOrder extends Document {
  orderItems: IOrderItem[],
  totalAmount: number,
  address: string,
  userId: string | ObjectId
}

const orderItemSchema = new Schema<IOrderItem> ({
  productTitle: {type : String, required: true},
  productImage: {type : String, required: true},
  unitPrice: {type : Number, required: true},
  quantity: {type : Number, required: true}
})

const orderSchema = new Schema<IOrder> ({
  orderItems: [orderItemSchema],
  totalAmount: {type: Number, required: true},
  address: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: "user", required: true},
})

export const orderModel = mongoose.model<IOrder>("order", orderSchema)