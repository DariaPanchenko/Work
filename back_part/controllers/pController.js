import Ord from '../my_db/ordMod.js'
import expressAsyncHandler from 'express-async-handler'
import asyncHandler from 'express-async-handler'
import NodeMailer from 'nodemailer'

const transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pancenkodara64@gmail.com',
        pass: process.env.EMAIL
    },
    tls: {
        rejectUnauthorized: false
    }
})

//Made new paid capsule
// POST /api/paid_orders
const addPaidOrders=expressAsyncHandler(async (req,res)=>{
    const { orderItm, payment, itemsPrice, allPrice } = req.body
    if (orderItm && orderItm.length === 0) {
        res.status(400)
        throw new Error('Нет заказов')
        return
    } else {
        const ord = new Ord({
            orderItm,
            user: req.user._id,
            payment,
            itemsPrice,
            allPrice,
        })
        const makedOrder = await ord.save()
        res.status(201).json(makedOrder)
    }
})
//Get order id
// GET /api/paid_orders/:id
const getOrderId = asyncHandler(async (req, res) => {
    const ord = await Ord.findById(req.params.id).populate(
        'user',
        'name email'
    )
    if (ord) {
        res.json(ord)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//  After order to paid
//  PUT /api/paid_orders/:id/paid pvt
const afterOrderPay = asyncHandler(async (req, res) => {
    const ord = await Ord.findById(req.params.id)
    if (ord) {
        ord.paidFinish = true
        ord.datePaid = Date.now()
        ord.paymentResult = {
            id: req.body.id,
            res: req.body.res,
            update_time: req.body.update_time,
            email_addr: req.body.payer.email_addr,
        }
        const afterPayOrder = await ord.save()
        res.json(afterPayOrder)

        let html = '';
        ord.orderItm.forEach(itm=>{
            console.log(itm.link)
            html+= itm.link + ' -> ' + itm.name;
        });
        await transporter.sendMail({
            from: 'pancenkodara64@gmail.com',
            to: req.user.email,
            subject: 'Ваш файл от Beauty look',
            html: html
        }, (error, info) => {
            console.log(error);
        })


    } else {
        res.status(404)
        throw new Error('Заказ не найден')
    }
})

//  get paid orders
//  GET /api/paid_orders/get_orders pvt
const getPaidUsrOrders = asyncHandler(async (req, res) => {
    const ords = await Ord.find({ user: req.user._id })
    res.json(ords)
})

//  get all orders
//  GET /api/paid_orders pvt
const getOrders = asyncHandler(async (req, res) => {
    const ords = await Ord.find({ }).populate('user','id name')
    res.json(ords)
})
export {addPaidOrders, getOrderId, afterOrderPay, getPaidUsrOrders,getOrders}