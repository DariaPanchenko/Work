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

 