import axios from 'axios'
import actionTypes from '../reducers/actionTypes.js'
import {logout} from './userActions.js'

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

export const createComm = (capsuleId, comm) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.CAPSULE_COMM_REQ,
        })
        const {userLog: { uInf }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${uInf.token}`,
            },
        }

        await axios.post(`/api/capsules/${capsuleId}/comms`, comm, config)

        dispatch({
            type: actionTypes.CAPSULE_COMM_SUCCESS,
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Нет авториирован, ошибка токена') {
            dispatch(logout())
        }
        dispatch({
            type: actionTypes.CAPSULE_COMM_FAIL,
            payload: message,
        })
    }
}
