import actionTypes from '../reducers/actionTypes.js'
import axios from "axios";

export const addItem = (id)=>async (dispatch, getState)=>{
    const {data}=await axios.get(`/api/capsules/${id}`)

    dispatch({
        type: actionTypes.CART_ADD_EL,
        payload:{
            caps: data._id,
            name:data.name,
            picture:data.picture,
            price:data.price,
            link: data.link,
            author: data.author,
        },
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const remItem = (id) =>(dispatch,getState)=>{
    dispatch({
        type: actionTypes.CART_REM_EL,
        payload: id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveBuyCapsule = (data) => (dispatch) => {
    dispatch({
        type: actionTypes.CART_SAVE_BUY,
        payload: data,
    })

    localStorage.setItem(' buyCaps', JSON.stringify(data))
}