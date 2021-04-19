import axios from 'axios'
export const allCpsles = () => async (dispatch) =>{
    try{
        dispatch({type:'ALL_CAPSULES_REQ'})
        const {data}=await axios.get('api/capsules')

        dispatch({
            type:'ALL_CAPSULES_OK',
            payload:data
        })
    }catch (error) {
        dispatch({
            type:'ALL_CAPSULES_FALSE',
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const cpslesSingle = (id) => async (dispatch) =>{
    try{
        dispatch({type:'CAPSULE_SINGLE_REQ'})
        const {data}=await axios.get(`/api/capsules/${id}`)

        dispatch({
            type:'CAPSULE_SINGLE_OK',
            payload:data
        })
    }catch (error) {
        dispatch({
            type:'CAPSULE_SINGLE_FALSE',
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}