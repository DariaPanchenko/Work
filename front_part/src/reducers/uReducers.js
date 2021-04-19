import actionTypes from './actionTypes.js'


export const uLoginReducer = (state= { },action) =>{
    switch (action.type){
        case actionTypes.USER_LOG_REQ:
            return {broadcast:true}
        case actionTypes.USER_LOG_SUCCESS:
            return {broadcast:false, uInf: action.payload}
        case actionTypes.USER_LOG_FAIL:
            return {broadcast:false, error: action.payload}
        case actionTypes.USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const uRegisterReducer =(state= { },action)=>{
    switch (action.type){
        case actionTypes.USER_REG_REQ:
            return {broadcast:true}
        case actionTypes.USER_REG_SUCCESS:
            return {broadcast:false, uInf: action.payload}
        case actionTypes.USER_REG_FAIL:
            return {broadcast:false, error: action.payload}
        case actionTypes.USER_LOGOUT:
            return {}
        default:
            return state
    }
}