export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
}

export interface Sale {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  totalAmount: number;
  saleDate: string;
  participantName: string;
}

export interface CreateOrderDto {
  productId: number;
  quantity: number;
  participantId?: number;
}
