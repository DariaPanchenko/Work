import actionTypes from '../reducers/actionTypes.js'
import axios from 'axios'
//make req
export const login = (email,password) =>async (dispatch)=>{
    try{
      dispatch({
          type: actionTypes.USER_LOG_REQ,
      })
        const{data} = await axios.post('/api/users/login', {email,password})

        dispatch({
            type:actionTypes.USER_LOG_SUCCESS,
            payload: data
        })

        localStorage.setItem('uInf',JSON.stringify(data))
    }catch (error) {
        dispatch({
            type: actionTypes.USER_LOG_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const logout =() =>(dispatch)=>{
    localStorage.removeItem('uInf')
    localStorage.removeItem('cartItems')
    dispatch({type:actionTypes.USER_LOGOUT})
    dispatch({type:actionTypes.USER_PARAM_RESET})
    dispatch({type:actionTypes.ORDERS_SEE_PAID_RESET})
    dispatch({type:actionTypes.USER_ALL_FORADM_RESET})
    document.location.href = '/login'
}

export const register = (name, email,password) =>async (dispatch)=>{
    try{
        dispatch({
            type: actionTypes.USER_REG_REQ,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const{data} = await axios.post('/api/users', {name,email,password},config)
        dispatch({
            type:actionTypes.USER_REG_SUCCESS,
            payload: data
        })
        dispatch({
            type:actionTypes.USER_LOG_SUCCESS,
            payload: data
        })
        localStorage.setItem('uInf',JSON.stringify(data))
    }catch (error) {
        dispatch({
            type: actionTypes.USER_REG_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}
export const restoreEmail = (email) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post('/api/users/restore', { email }, config)

    } catch (error) {
        dispatch({
            type: actionTypes.USER_LOG_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const submitEmail = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.USER_SUBMIT_REQ,
        })

        const {userLog: { uInf },} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${uInf.token}`,
            },
        }
        const { data } = await axios.put(`/api/users/profile`, user, config)
        dispatch({
            type: actionTypes.USER_SUBMIT_SUCCESS,
            payload: data,
        })
        dispatch({
            type: actionTypes.USER_LOG_SUCCESS,
            payload: data,
        })
        localStorage.setItem('uInf', JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Ошибка токена') {
            dispatch(logout())
        }
        dispatch({
            type: actionTypes.USER_SUBMIT_FAIL,
            payload: message,
        })
    }
}

export const paramProfile = (id) =>async (dispatch, getState)=>{
    try{
        dispatch({
            type: actionTypes.USER_PARAM_REQ,
        })
        const {userLog: {uInf}} = getState()
        const config ={
            headers: {
                Authorization: `Bearer ${uInf.token}`
            },
        }
        const{data} = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type:actionTypes.USER_PARAM_SUCCESS,
            payload: data
        })
    }catch (error) {
        dispatch({
            type: actionTypes.USER_PARAM_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const updProfile = (userProf) =>async (dispatch, getState)=>{
    try{
        dispatch({
            type: actionTypes.USER_UPDPROF_REQ,
        })
        const {userLog: {uInf}} = getState()
        const config ={
            headers: {
                Authorization: `Bearer ${uInf.token}`
            },
        }
        const{data} = await axios.put(`/api/users/profile`, userProf, config)
        dispatch({
            type:actionTypes.USER_UPDPROF_SUCCESS,
            payload: data
        })
        dispatch({
            type:actionTypes.USER_LOG_SUCCESS,
            payload: data
        })
        localStorage.setItem('uInf',JSON.stringify(data))
    }catch (error) {
        dispatch({
            type: actionTypes.USER_UPDPROF_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const AllUsersForAdm = () =>async (dispatch, getState)=>{
    try{
        dispatch({
            type: actionTypes.USER_ALL_FORADM_REQ,
        })
        const {userLog: {uInf}} = getState()
        const config ={
            headers: {
                Authorization: `Bearer ${uInf.token}`
            },
        }
        const{data} = await axios.get(`/api/users`, config)
        dispatch({
            type:actionTypes.USER_ALL_FORADM_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.USER_ALL_FORADM_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const DelUserForAdm = (id) =>async (dispatch, getState)=>{
    try{
        dispatch({
            type: actionTypes.USER_DEL_FORADM_REQ,
        })
        const {userLog: {uInf}} = getState()
        const config ={
            headers: {
                Authorization: `Bearer ${uInf.token}`
            },
        }
        await axios.delete(`/api/users/${id}`, config)
        dispatch({
            type:actionTypes.USER_DEL_FORADM_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: actionTypes.USER_DEL_FORADM_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}
export const ChangeUserForAdm = (user) =>async (dispatch, getState)=>{
    try{
        dispatch({
            type: actionTypes.USER_CHANGE_FORADM_REQ,
        })
        const {userLog: {uInf}} = getState()
        const config ={
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${uInf.token}`
            },
        }
        const {data} = await axios.put(`/api/users/${user._id}`, user, config)
        dispatch({
            type:actionTypes.USER_CHANGE_FORADM_SUCCESS
        })
        dispatch({
            type:actionTypes.USER_PARAM_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.USER_CHANGE_FORADM_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}