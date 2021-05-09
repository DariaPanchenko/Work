import express from 'express'
const router = express.Router()
import {
    addPaidOrders,
    getOrderId,
    afterOrderPay,
    getPaidUsrOrders,
    /*
    updateOrderToDelivered,
    getOrders,*/
} from '../controllers/pController.js'
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from '../my_db/userMod.js'

const security = asyncHandler(async (req,res,next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const reverse = jwt.verify(token, process.env.JWT_SEC)
            // console.log(reverse)
            req.user = await User.findById(reverse.id).select('-password')
            next()} catch (e){
            res.status(401)
            console.error(e)
            throw new Error('Что-то пошло не так, неверный токен')
        }
    }
    if(!token) {
        res.status(401)
        console.log('Нет токена')
        throw new Error('Нет токена')
    }

})
router.route('/').post(security, addPaidOrders)
router.route('/get_orders').get(security,getPaidUsrOrders)
router.route('/:id').get(security,getOrderId)
router.route('/:id/paid').put(security,afterOrderPay)


export default router