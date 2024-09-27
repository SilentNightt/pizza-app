import { CartItem } from "../redux/slices/cartSlice";

export const CalckTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
}