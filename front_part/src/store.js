import {createStore} from 'redux'
import {combineReducers} from 'redux'
import {applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {allCapsulesReducer} from './reducers/capsuleResucers.js'

const initialState = {}
const reducer = combineReducers( {allCapsules: allCapsulesReducer})
const middleware = [thunk]
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store