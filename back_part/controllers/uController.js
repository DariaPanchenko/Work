import User from '../my_db/userMod.js'
import expressAsyncHandler from 'express-async-handler'
import genToken from '../other/genTok.js'
//import genToken2 from '../other/genTok2.js'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import NodeMailer from 'nodemailer'
dotenv.config()

const transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dpancenko254@gmail.com',
        pass: 'kee4ds89hl'
    },
    tls: {
        rejectUnauthorized: false
    }
})

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
// @desc    Restore password
// @route   POST /api/restore
// @access  Public
const restoreUser = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (user) {
        let password = Math.random().toString(36).substring(7);
        await transporter.sendMail({
            from: 'dpancenko254@gmail.com',
            to: email,
            subject: 'New password',
            html: '<p>Нажмите на <a href="http://localhost:3000/login">ссылку</a> чтобы зайти с новым паролем - ' + password + '</p>'
        }, (error, info) => {
            console.log(error);
            if(info!==undefined){
                user.password = password;
                user.save();
            }
        })
        res.status(200);
    } else {
        res.status(401)
        throw new Error('Invalid email')
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

export {authorizationUser,restoreUser, registrationUser, userProfile, userProfileUpd}
