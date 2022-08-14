import * as actionTypes from "./actionTypes"

//sepete ekle 
export function addToCart(cartItem){
    return {type:actionTypes.ADD_TO_CART, payload:cartItem}
}

//sepetten silme producti yolamis olayim 
export function removeFromCart(product){
    return {type:actionTypes.REMOVE_FROM_CART, payload:product}
}
