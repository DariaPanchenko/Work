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
    document.location.href = '/login'
}

export const register = (name, email,password) =>async (dispatch)=>{
    try{
        dispatch({
            type: actionTypes.USER_REG_REQ,
        })
        const{data} = await axios.post('/api/users', {name,email,password})
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

export const forgotPassword= (email) =>async (dispatch)=>{
    try{
        dispatch({
            type: actionTypes.USER_FORGOT_REQ,
        })
        const{data} = await axios.put('/api/users/forgotpass', {email})

        dispatch({
            type:actionTypes.USER_FORGOT_SUCCESS,
            payload: data
        })
        localStorage.setItem('uInfo',JSON.stringify(data))
    }catch (error) {
        dispatch({
            type: actionTypes.USER_FORGOT_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}
export const resetPassword= (id,password) =>async (dispatch,getState)=>{
    try{
        dispatch({
            type: actionTypes.USER_RESET_REQ,
        })
        const {userLog: {uInf}} = getState()
        const config ={
            headers: {
                Authorization: `Bearer ${uInf.token}`
            },
        }
        const{data} = await axios.put(`/api/users/resetpass/${id}`,  {password})
        dispatch({
            type:actionTypes.USER_RESET_SUCCESS,
            payload: data
        })
        dispatch({
            type:actionTypes.USER_LOG_SUCCESS,
            payload: data
        })
        localStorage.setItem('uInf',JSON.stringify(data))
    }catch (error) {
        dispatch({
            type: actionTypes.USER_RESET_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
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