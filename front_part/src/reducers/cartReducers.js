import actionTypes from './actionTypes.js'
export const cartReducer = (state = {cartItems:[]},action) => {
    switch (action.type){
        case  actionTypes.CART_ADD_EL:
            const itm= action.payload
            const existItm = state.cartItems.find((x)=>x.capsule === itm.capsule)
            if(existItm){
            return {
                ...state,
                cartItems: state.cartItems.map((x)=>x.capsule===existItm.capsule?itm:x)
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
                cartItems: state.cartItems.filter((x)=>x.capsule!== action.payload)
            }
        case actionTypes.CART_ALL_DEL:
            return {
                ...state,
                cartItems: [],
            }
        case actionTypes.CART_SAVE_BUY:
            return {
                ...state,
                paymentMethod: action.payload,
            }
            default:
            return state
    }
}