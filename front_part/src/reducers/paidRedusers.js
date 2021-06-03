import actionTypes from './actionTypes.js'

export const madeOrderReducer = (state = {}, action)=>{
    switch (action.type) {
        case actionTypes.MADE_ORDER_REQ:
            return {
                broadcast: true,
            }
        case actionTypes.MADE_ORDER_SUCCESS:
            return {
                broadcast: false,
                success: true,
                ord: action.payload,
            }
        case actionTypes.MADE_ORDER_FAIL:
            return {
                broadcast: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const orderIdReducer = (state = { broadcast: true, orderItm: [] }, action) => {
    switch (action.type) {
        case actionTypes.ORDER_ID_REQ:
            return {
                ...state,
                broadcast: true,
            }
        case actionTypes.ORDER_ID_SUCCESS:
            return {
                broadcast: false,
                ord: action.payload,
            }
        case actionTypes.ORDER_ID_FAIL:
            return {
                broadcast: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const orderProcPayReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ORDER_PAID_REQ:
            return {
                broadcast: true,
            }
        case actionTypes.ORDER_PAID_SUCCESS:
            return {
                broadcast: false,
                success: true,
            }
        case actionTypes.ORDER_PAID_FAIL:
            return {
                broadcast: false,
                error: action.payload,
            }
        case actionTypes.ORDER_PAID_RESET:
            return {}
        default:
            return state
    }
}

export const getPaidUsrOrdersReducer = (state = {ords:[]}, action) => {
    switch (action.type) {
        case actionTypes.ORDERS_SEE_PAID_REQ:
            return {
                broadcast: true,
            }
        case actionTypes.ORDERS_SEE_PAID_SUCCESS:
            return {
                broadcast: false,
                ords: action.payload,
            }
        case actionTypes.ORDERS_SEE_PAID_FAIL:
            return {
                broadcast: false,
                error: action.payload,
            }
        case actionTypes.ORDERS_SEE_PAID_RESET:
            return {
                ords:[]
            }
        default:
            return state
    }
}

export const getAllOrdersReducer = (state = {ords:[]}, action) => {
    switch (action.type) {
        case actionTypes.ORDERS_ALL_REQ:
            return {
                broadcast: true,
            }
        case actionTypes.ORDERS_ALL_SUCCESS:
            return {
                broadcast: false,
                ords: action.payload,
            }
        case actionTypes.ORDERS_ALL_FAIL:
            return {
                broadcast: false,
                error: action.payload,
            }
        default:
            return state
    }
}