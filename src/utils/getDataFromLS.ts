import { CartItem } from "../store/cart/types"
import { calcTotalPrice } from "./calcTotalPrice"

export const getDataFromLS = () => {
  const data = localStorage.getItem('cart')
  const items = (data ? JSON.parse(data) : []) as CartItem[]
  const totalPrice = calcTotalPrice(items)
  return { items, totalPrice }
}