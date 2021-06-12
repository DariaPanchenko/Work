import jwt from 'jsonwebtoken'
import User from '../my_db/userMod.js'
import asyncHandler from 'express-async-handler'
import express from 'express'
import {authorizationUser, restoreUser, registrationUser, userProfile,
    userProfileUpd,userAllForAdmin,delUserForAdmin, userGetIdForAdmin,userUpdateForAdmin,/*, userForgotPass, userResetPass*/ } from '../controllers/uController.js'
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
const isAdmin = (req,res,next) =>{
    if(req.user && req.user.admin){
        next()
    } else{
        res.status(401)
        console.log('Вы не являетесь администратором')
        throw new Error('Вы не являетесь администратором')
    }
}
router.route('/').post(registrationUser).get(security,isAdmin,userAllForAdmin)
router.route('/restore').post(restoreUser)
router.post('/login',authorizationUser)
router.route('/profile').get(security, userProfile).put(security, userProfileUpd)
router.route('/:id').delete(security,isAdmin,delUserForAdmin).get(security,isAdmin,userGetIdForAdmin).put(security,isAdmin,userUpdateForAdmin)
export default router