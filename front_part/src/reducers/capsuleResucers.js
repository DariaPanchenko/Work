 export const allCapsulesReducer = (state= { capsules:[] },action) =>{
    switch (action.type){
        case 'ALL_CAPSULES_REQ':
            return {broadcast:true, capsules: []}
        case 'ALL_CAPSULES_OK':
            return {broadcast:false, capsules: action.payload}
        case 'ALL_CAPSULES_FALSE':
            return {broadcast:false, error: action.payload}
        default:
            return state
    }
 }

