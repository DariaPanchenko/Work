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

export const uForgotPassReducer =(state= { },action)=>{
    switch (action.type){
        case actionTypes.USER_FORGOT_REQ:
            return {broadcast:true}
        case actionTypes.USER_FORGOT_SUCCESS:
            return {broadcast:false, uInfo: action.payload}
        case actionTypes.USER_FORGOT_FAIL:
            return {broadcast:false, error: action.payload}
        default:
            return state
    }
}

export const uResetPassReducer=(state= { },action)=>{
    switch (action.type){
        case actionTypes.USER_RESET_REQ:
            return {broadcast:true}
        case actionTypes.USER_RESET_SUCCESS:
            return {broadcast:false, uInfores: action.payload, success: true}
        case actionTypes.USER_RESET_FAIL:
            return {broadcast:false, error: action.payload}
        case actionTypes.USER_RESET_RESET:
            return {}
        default:
            return state
    }
}

export const uParamReducer =(state= { userProf:{}},action)=>{
    switch (action.type){
        case actionTypes.USER_PARAM_REQ:
            return { ...state, broadcast:true}
        case actionTypes.USER_PARAM_SUCCESS:
            return {broadcast:false, userProf: action.payload}
        case actionTypes.USER_PARAM_FAIL:
            return {broadcast:false, error: action.payload}
        default:
            return state
    }
}

export const uUpdProfReducer =(state= { },action)=>{
    switch (action.type){
        case actionTypes.USER_UPDPROF_REQ:
            return { broadcast:true}
        case actionTypes.USER_UPDPROF_SUCCESS:
            return {broadcast:false, userProfNew: action.payload, success: true}
        case actionTypes.USER_UPDPROF_FAIL:
            return {broadcast:false, error: action.payload}
        case actionTypes.USER_UPDPROF_RESET:
            return {}
        default:
            return state
    }
}