import { CartItem } from "../store/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce(
    (init, next) => init + next.price * next.count,
    0,
  );
}