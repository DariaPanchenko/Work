import {createStore} from 'redux'
import {combineReducers} from 'redux'
import {applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {allCapsulesReducer, CapsuleSingleReducer,CapsuleDelReducer, CapsuleCommReducer, CapsuleMadeNewReducer, CapsuleSetReducer} from './reducers/capsuleResucers.js'
import {cartReducer} from './reducers/cartReducers.js'
import {uLoginReducer, uRegisterReducer, uForgotPassReducer,uSubmitReducer,
    uResetPassReducer, uParamReducer, uUpdProfReducer, usersAllForAdmReducer, userDelForAdmReducer,
    userChangeForAdmReducer} from './reducers/uReducers.js'
import {madeOrderReducer, orderIdReducer, orderProcPayReducer, getPaidUsrOrdersReducer, getAllOrdersReducer } from './reducers/paidRedusers.js'

const reducer = combineReducers( {allCapsules: allCapsulesReducer, capsuleSingle:CapsuleSingleReducer, CapsuleDel: CapsuleDelReducer,
    capsuleComm:CapsuleCommReducer, CapsuleMadeNew: CapsuleMadeNewReducer, CapsuleSet: CapsuleSetReducer, cart: cartReducer, userLog: uLoginReducer, userRegister: uRegisterReducer,
    userForgotPass:uForgotPassReducer, userSubmit:uSubmitReducer,userResetPass:uResetPassReducer, userParam: uParamReducer,
    userUpdProf: uUpdProfReducer, madeOrder: madeOrderReducer, orderId: orderIdReducer, orderProcPay: orderProcPayReducer,
    getPaidUsrOrder: getPaidUsrOrdersReducer, usersAllForAdm: usersAllForAdmReducer, userDelForAdm: userDelForAdmReducer,
    userChangeForAdm:userChangeForAdmReducer, getAllOrders: getAllOrdersReducer})
const cartItmsFromStor = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const uInfFromStor = localStorage.getItem('uInf')?JSON.parse(localStorage.getItem('uInf')):null
const initialState = {cart: {cartItems: cartItmsFromStor}, userLog:{uInf:uInfFromStor}}
const middleware = [thunk]
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store