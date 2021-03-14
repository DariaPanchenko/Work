import axios from 'axios'
export const allCapsules = () => async (dispatch) =>{
    try{
        dispatch({type:'ALL_CAPSULES_REQ'})
        const {data}=await axios.get('api/capsules')

        dispatch({
            type:'ALL_CAPSULES_OK',
            payload:data
        })
    }catch (e) {
        dispatch({
            type:'ALL_CAPSULES_FALSE',
            payload: e.response.data.message
        })
    }
}