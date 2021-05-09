import actionTypes from '../reducers/actionTypes.js'
import axios from 'axios'
import {getPaidUsrOrdersReducer} from "../reducers/paidRedusers";

export const orderMade = (ord) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.MADE_ORDER_REQ,
        })

        const {userLog: { uInf },} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${uInf.token}`,
            },
        }

        const { data } = await axios.post(`/api/paid_orders`, ord, config)

        dispatch({
            type: actionTypes.MADE_ORDER_SUCCESS,
            payload: data,
        })
     /*   dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        })
        localStorage.removeItem('cartItems')*/
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: actionTypes.MADE_ORDER_FAIL,
            payload: message,
        })
    }
}

export const getOrderId = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.ORDER_ID_REQ,
        })
        const {userLog: { uInf },} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${uInf.token}`,
            },
        }
        const { data } = await axios.get(`/api/paid_orders/${id}`, config)
        dispatch({
            type: actionTypes.ORDER_ID_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: actionTypes.ORDER_ID_FAIL,
            payload: message,
        })
    }
}

export const procPayOrder = (ordId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.ORDER_PAID_REQ,
        })

        const {userLog: { uInf },} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${uInf.token}`,
            },
        }

        const { data } = await axios.put(`/api/paid_orders/${ordId}/paid`, paymentResult, config)

        dispatch({
            type: actionTypes.ORDER_PAID_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: actionTypes.ORDER_PAID_FAIL,
            payload: message,
        })
    }
}

export const userPaidOrderGet = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.ORDERS_SEE_PAID_REQ,
        })

        const {userLog: { uInf },} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${uInf.token}`,
            },
        }

        const { data } = await axios.get(`/api/paid_orders/get_orders`, config)

        dispatch({
            type: actionTypes.ORDERS_SEE_PAID_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: actionTypes.ORDERS_SEE_PAID_FAIL,
            payload: message,
        })
    }
}