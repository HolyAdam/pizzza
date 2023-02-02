export type CartItem = {
  title: string;
  price: number;
  imageUrl: string;
  id: string;
  type: string;
  size: number;
  count: number;
}

export interface cartSliceState {
  totalPrice: number,
  items: CartItem[]
}