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
       /* case ORDER_CREATE_RESET:
            return {}*/
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
