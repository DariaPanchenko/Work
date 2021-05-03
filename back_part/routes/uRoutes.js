import jwt from 'jsonwebtoken'
import User from '../my_db/userMod.js'
import asyncHandler from 'express-async-handler'
import express from 'express'
import {authorizationUser, restoreUser, registrationUser, userProfile, userProfileUpd/*, userForgotPass, userResetPass*/ } from '../controllers/uController.js'
const router = express.Router()

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

router.route('/').post(registrationUser)
router.post('/login',authorizationUser)
router.route('/restore').post(restoreUser)
router.route('/profile').get(security, userProfile).put(security, userProfileUpd)
export default router