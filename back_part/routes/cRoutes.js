import express from 'express'
import multer from 'multer'
import path from 'path'
//import Capsule from '../my_db/capsuleMod.js'
//import expressAsyncHandler from 'express-async-handler'
import {createCapsuleComm, getCapsuleId,delCapsule,madeNewCapsule,updateCapsule, getCapsules} from '../controllers/cController.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../my_db/userMod.js'

const router = express.Router()
/*
router.get('/',expressAsyncHandler(async (req,res)=>{
    const Capsules = await Capsule.find({})
    res.json(Capsules)
}))

router.get('/:id',expressAsyncHandler(async (req,res)=>{
    const capsule = await Capsule.findById(req.params.id)
    if(capsule){
        res.json(capsule)
    }else {
        res.status(404).json({message:'Capsule not found'})
    }
}))*/
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
    if(req.user && (req.user.admin||req.user.newCreator)){
        next()
    } else{
        res.status(401)
        console.log('Вы не являетесь администратором')
        throw new Error('Вы не являетесь администратором')
    }
}

const isCreator = (req,res,next) =>{
    if(req.user && req.user.newCreator){
        next()
    } else{
        res.status(401)
        console.log('Вы не являетесь создателем подборок')
        throw new Error('Вы не являетесь создателем подборок')
    }
}

router.route('/').get(getCapsules).post(security,isAdmin,madeNewCapsule)
router.route('/:id').get(getCapsuleId).delete(security,isAdmin,delCapsule).
    put(security,isAdmin,updateCapsule)
router.route('/:id/comms').post(security, createCapsuleComm)
export default router