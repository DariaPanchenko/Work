import actionTypes from './actionTypes.js'
export const allCapsulesReducer = (state= { Capsules:[] },action) =>{
    switch (action.type){
        case 'ALL_CAPSULES_REQ':
            return {broadcast:true, Capsules: []}
        case 'ALL_CAPSULES_OK':
            return {broadcast:false, Capsules: action.payload}
        case 'ALL_CAPSULES_FALSE':
            return {broadcast:false, error: action.payload}
        default:
            return state
    }
 }
 export const CapsuleSingleReducer = (state= { capsule:{comms:[]} },action) =>{
     switch (action.type){
         case 'CAPSULE_SINGLE_REQ':
             return {broadcast:true, ...state}
         case 'CAPSULE_SINGLE_OK':
             return {broadcast:false, capsule: action.payload}
         case 'CAPSULE_SINGLE_FALSE':
             return {broadcast:false, error: action.payload}
         default:
             return state
     }
 }

export const CapsuleDelReducer = (state= { },action) =>{
    switch (action.type){
        case actionTypes.CAPSULE_DEL_REQ:
            return {broadcast:true}
        case actionTypes.CAPSULE_DEL_SUCCESS:
            return {broadcast:false, success: true}
        case actionTypes.CAPSULE_DEL_FAIL:
            return {broadcast:false, error: action.payload}
        default:
            return state
    }
}

export const CapsuleMadeNewReducer = (state= { },action) =>{
    switch (action.type){
        case actionTypes.CAPSULE_MADE_NEW_REQ:
            return {broadcast:true}
        case actionTypes.CAPSULE_MADE_NEW_SUCCESS:
            return {broadcast:false, success: true, capsule: action.payload}
        case actionTypes.CAPSULE_MADE_NEW_FAIL:
            return {broadcast:false, error: action.payload}
        case actionTypes.CAPSULE_MADE_NEW_RESET:
            return {}

        default:
            return state
    }
}

 export const CapsuleCommReducer = (state = {}, action) => {
     switch (action.type) {
         case actionTypes.CAPSULE_COMM_REQ:
             return { broadcast: true }
         case actionTypes.CAPSULE_COMM_SUCCESS:
             return { broadcast: false, success: true}
         case actionTypes.CAPSULE_COMM_FAIL:
             return { broadcast: false, error: action.payload }
         case actionTypes.CAPSULE_COMM_RESET:
             return {}
         default:
             return state
     }
 }

export const CapsuleSetReducer = (state= { capsule: {}},action) =>{
    switch (action.type){
        case actionTypes.CAPSULE_SET_REQ:
            return {broadcast:true}
        case actionTypes.CAPSULE_SET_SUCCESS:
            return {broadcast:false, success: true, capsule: action.payload}
        case actionTypes.CAPSULE_SET_FAIL:
            return {broadcast:false, error: action.payload}
        case actionTypes.CAPSULE_SET_RESET:
            return {capsule: {}}
        default:
            return state
    }
}
