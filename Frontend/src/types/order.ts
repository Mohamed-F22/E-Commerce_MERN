interface OrderItem {
    productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface Order {
  orderItems: OrderItem[],
  orderId: string,
  address: string,
  totalAmount: number
}