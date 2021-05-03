import actionTypes from './actionTypes.js'

export const cartReducer = (state = {cartItems:[]},action) => {
    switch (action.type){
        case  actionTypes.CART_ADD_EL:
            const itm= action.payload
            const existItm = state.cartItems.find((i)=>i.Capsule === itm.Capsule)
            if(existItm){
            return {
                ...state,
                cartItems: state.cartItems.map((i)=>i.Capsule===existItm.Capsule?itm:i)
            }
           } else{
            return {
                   ...state,
                    cartItems: [...state.cartItems, itm]
               }
            }
        case actionTypes.CART_REM_EL:
            return {
                ...state,
                cartItems: state.cartItems.filter((i)=>i.Capsule !== action.payload)
            }
        case actionTypes.CART_ALL_DEL:
            return {
                ...state,
                cartItems: [],
            }
        case actionTypes.CART_SAVE_BUY:
            return {
                ...state,
                buyCaps: action.payload,
            }
            default:
            return state
    }
}