import {createStore} from 'redux'
import {combineReducers} from 'redux'
import {applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {allCapsulesReducer, CapsuleSingleReducer, CapsuleCommReducer} from './reducers/capsuleResucers.js'
import {cartReducer} from './reducers/cartReducers.js'
import {uLoginReducer, uRegisterReducer, uForgotPassReducer,
    uResetPassReducer, uParamReducer, uUpdProfReducer} from './reducers/uReducers.js'
import {madeOrderReducer, orderIdReducer, orderProcPayReducer, getPaidUsrOrdersReducer } from './reducers/paidRedusers.js'

const reducer = combineReducers( {allCapsules: allCapsulesReducer, capsuleSingle:CapsuleSingleReducer,
    capsuleComm:CapsuleCommReducer, cart: cartReducer, userLog: uLoginReducer, userRegister: uRegisterReducer,
    userForgotPass:uForgotPassReducer, userResetPass:uResetPassReducer, userParam: uParamReducer,
    userUpdProf: uUpdProfReducer, madeOrder: madeOrderReducer, orderId: orderIdReducer, orderProcPay: orderProcPayReducer,
    getPaidUsrOrder: getPaidUsrOrdersReducer})
const cartItmsFromStor = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const uInfFromStor = localStorage.getItem('uInf')?JSON.parse(localStorage.getItem('uInf')):null
const initialState = {cart: {cartItems: cartItmsFromStor}, userLog:{uInf:uInfFromStor}}
const middleware = [thunk]
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store