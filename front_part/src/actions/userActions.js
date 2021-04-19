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
    dispatch({type:actionTypes.USER_LOGOUT})
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