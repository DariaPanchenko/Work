import User from '../my_db/userMod.js'
import expressAsyncHandler from 'express-async-handler'
import genToken from '../other/genTok.js'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import NodeMailer from 'nodemailer'
dotenv.config()

const transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pancenkodara64@gmail.com',
        pass: process.env.EMAIL,
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
            newCreator:user.newCreator,
            passcode:user.passcode,
            token: genToken(user._id)
        })
    } else{
        res.status(401).json({message:'Неверный email или пароль'})
    }
})

//     Restore password
//     POST /api/users/restore
const restoreUser = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (user) {
        let password = Math.random().toString(36).substring(7);
        await transporter.sendMail({
            from: 'pancenkodara64@gmail.com',
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
    const userExtsName = await User.findOne({name})

    if(userExts){
        res.status(400)
        throw new Error('Пользователь уже существует с такой почтой')
    }
    if(userExtsName){
        res.status(400)
        throw new Error('Пользователь уже существует c таким именем')
    }
    const user = await User.create({
        name,
        email,
        password,
        admin: name === 'Admin',
        passcode: Math.random().toString(36).substring(7)

    });
    await transporter.sendMail({
        from: 'pancenkodara64@gmail.com',
        to: email,
        subject: 'Passcode',
        text: user.passcode
    }, (error) => {
        console.log(error);
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            admin:user.admin,
            newCreator:user.newCreator,
            passcode:user.passcode,
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
            newCreator:user.newCreator,
        })
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
        user.passcode = req.body.passcode|| user.passcode
        if(req.body.password){
            user.password = req.body.password
        }
        const updUser = await user.save()
        res.json({
            _id:updUser._id,
            name:updUser.name,
            email:updUser.email,
            admin:updUser.admin,
            newCreator:updUser.newCreator,
            passcode: updUser.passcode,
            token: genToken(updUser._id)
        })
    } else {
        res.status(404)
        console.log('Пользователь не найден')
        throw new Error('Пользователь не найден')
    }
})

// GET /api/users  ptv admin
// get user profile all
const userAllForAdmin = asyncHandler(async (req,res)=>{
    const users = await User.find({})
        res.json(users)
})

// DELETE /api/users/:id ptv admin
// del user
const delUserForAdmin = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'Пользователь удален' })
    } else {
        res.status(404)
        console.log('Пользователь не найден')
        throw new Error('Пользователь не найден')
    }
})

// GET /api/users/:id  ptv admin
// get user profile id
const userGetIdForAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        console.log('Пользователь не найден')
        throw new Error('Пользователь не найден')
    }
})

//  PUT /api/users/:id ptv admin
//  update user for adm
const userUpdateForAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.newCreator = req.body.newCreator
        const updUser = await user.save()
        res.json({
            _id: updUser._id,
            newCreator: updUser.newCreator
        })

    } else {
        res.status(404)
        console.log('Пользователь не найден')
        throw new Error('Пользователь не найден')
    }
})

export {authorizationUser,restoreUser, registrationUser, userProfile, userProfileUpd, userAllForAdmin,delUserForAdmin,
    userGetIdForAdmin,userUpdateForAdmin}
