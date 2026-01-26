interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface IAddress {
  governorate: string;
  town: string;
  zipCode: string;
  details: string;
  notes: string;
}

export interface Order {
  orderItems: OrderItem[];
  orderId: string;
  address: IAddress;
  totalAmount: number;
  notes: string
}
