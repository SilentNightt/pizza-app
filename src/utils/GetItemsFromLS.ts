import { CalckTotalPrice } from "./CalcTotalPrice"

export const getItemFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data): []
    const totalPrice = CalckTotalPrice(items)
    
    return {
       items,
       totalPrice
    }
    
}