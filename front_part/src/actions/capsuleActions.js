import axios from 'axios'
import actionTypes from '../reducers/actionTypes.js'
import {logout} from './userActions.js'

export const allCpsles = () => async (dispatch) =>{
    try{
        dispatch({type:'ALL_CAPSULES_REQ'})
        const {data}=await axios.get('/api/capsules')

        dispatch({
            type:'ALL_CAPSULES_OK',
            payload:data
        })
    }catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type:'ALL_CAPSULES_FALSE',
            payload:message
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
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type:'CAPSULE_SINGLE_FALSE',
            payload: message
        })
    }
}

export const delCapsule = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.CAPSULE_DEL_REQ,
        })

        const {userLog: { uInf },} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${uInf.token}`,
            },
        }

       await axios.delete(`/api/capsules/${id}`, config)

        dispatch({
            type: actionTypes.CAPSULE_DEL_SUCCESS,
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: actionTypes.CAPSULE_DEL_FAIL,
            payload: message,
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
                Authorization: `Bearer ${uInf.token}`,
            },
        }

        await axios.post(`/api/capsules/${capsuleId}/comms`, comm, config)

        dispatch({
            type: actionTypes.CAPSULE_COMM_SUCCESS,
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Не авторизирован, ошибка токена') {
            dispatch(logout())
        }
        dispatch({
            type: actionTypes.CAPSULE_COMM_FAIL,
            payload: message,
        })
    }
}


export const MadeNewCapsule = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.CAPSULE_MADE_NEW_REQ,
        })

        const {userLog: { uInf },} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${uInf.token}`,
            },
        }

       const {data} = await axios.post(`/api/capsules`, {}, config)

        dispatch({
            type: actionTypes.CAPSULE_MADE_NEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: actionTypes.CAPSULE_MADE_NEW_FAIL,
            payload: message,
        })
    }
}

export const SetCapsule = (capsule) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.CAPSULE_SET_REQ,
        })

        const {userLog: { uInf },} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${uInf.token}`,
            },
        }

        const {data} = await axios.put(`/api/capsules/${capsule._id}`, capsule, config)

        dispatch({
            type: actionTypes.CAPSULE_SET_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: actionTypes.CAPSULE_SET_FAIL,
            payload: message,
        })
    }
}
