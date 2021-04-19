import User from '../my_db/userMod.js'
import expressAsyncHandler from 'express-async-handler'
import genToken from '../other/genTok.js'
import genToken2 from '../other/genTok2.js'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
dotenv.config()
import mailgun from 'mailgun-js'
const DOMAIN = 'sandboxf9bd8753d17249438e120eab3ca046da.mailgun.org'
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN})

// POST /api/users/login
// Auth user and get token
const authorizationUser=expressAsyncHandler(async (req,res)=>{
    const {email,password} =req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            admin:user.admin,
            mark:user.mark,
            token: genToken(user._id)
        })
    } else{
        res.status(401).json({message:'Неверный email или пароль'})
    }
})

// POST /api/users
// User registration
const registrationUser=asyncHandler(async (req,res)=>{
    const {name, email,password} =req.body

    const userExts = await User.findOne({email})
    if(userExts){
        res.status(400)
        throw new Error('Пользователь уже существует')
    }
    const user = await User.create({
        name,
        email,
        password,
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            admin:user.admin,
            mark:user.mark,
            token: genToken(user._id)
        })
    } else{
        res.status(400).json({message:'Неверные данные'})
        throw new Error('Неверные данные')
    }
})

// GET /api/users/profile  ptv
// user profile
const userProfile = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            admin:user.admin,
            mark:user.mark,
        })
        //res.send('успешно')
    } else {
        res.status(404)
        console.log('Пользователь не найден')
        throw new Error('Пользователь не найден')
    }
})

// PUT /api/users/profile  ptv
// user profile update
const userProfileUpd = asyncHandler(async (req,res)=>{
    //const user = await User.findById(req.user._id)
    //res.send('success')
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updUser = await user.save()
        res.json({
            _id:updUser._id,
            name:updUser.name,
            email:updUser.email,
            admin:updUser.admin,
            mark:updUser.mark,
            token: genToken(updUser._id)
        })
    } else {
        res.status(404)
        console.log('Пользователь не найден')
        throw new Error('Пользователь не найден')
    }
})

// PUT /api/users/forgotpass
// link and get token
const userForgotPass = asyncHandler(async (req,res)=>{
    const {email} =req.body
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error('Пользователя нет с таким email')
    } else {
        const token = genToken2(user._id)
        const data = {
            from: 'noreply@blook.com',
            to: email,
            subject: 'Ссылка для восстановления пароля',
            html: `<h2>Нажмите на эту ссылку,чтобы сбросить пароль</h2>
            <p>http://localhost:3000/resetpass/${token}</p>`
        }
        return user.updateOne({resetLinkPass:token}, (error) => {
                if (error) {
                    return res.status(400).json({error: 'Ошибка ссылки'})
                } else {
                    mg.messages().send(data,function (err,body){
                        if(err){
                            return res.json({
                                error: err.message
                            })
                        }
                        return res.json({message: 'Письмо отправлено, проверьте вашу почту'})
                    })
                }
            })
    }
})

// PUT /api/users/resetpass
// reset pass
const userResetPass = asyncHandler(async (req,res)=>{
    const {resetLinkPass,newPass} = req.body
    if(resetLinkPass){
        jwt.verify(resetLinkPass, process.env.RESET_PASS, async (error)=>{
            if(error){
                res.status(401).json({error:'Неверный токен'})
            }
            await User.findOne({resetLinkPass},(error,user)=>{
                if(!user){
                    res.status(400).json({error:'Пользователя нет с таким токеном'})
                    throw new Error('Пользователя нет с таким токеном')
                } else{
                    const resetUs = {
                        password: newPass,
                        resetLinkPass:''
                    }
                    user = _.extend(user,resetUs)
                    user.save((error)=>{
                        if (error) {
                            return res.status(400).json({error: 'Ошибка сброса пароля'})
                        } else {
                                return res.status(200).json({message: 'Вы успешно сменили пароль'})
                        }
                    })
                }
            })
        })
    }else{
        res.status(401).json({error:'Ошибка аутентификации'})
    }

})
export {authorizationUser,registrationUser, userProfile, userProfileUpd, userForgotPass, userResetPass}
