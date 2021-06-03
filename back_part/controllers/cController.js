import Capsule from '../my_db/capsuleMod.js'
import expressAsyncHandler from 'express-async-handler'
import asyncHandler from 'express-async-handler'

// GET /api/capsules
const getCapsules=expressAsyncHandler(async (req,res)=>{
    const Capsules = await Capsule.find({})
    res.json(Capsules)
})

// GET /api/capsules/:id
const getCapsuleId=expressAsyncHandler(async (req,res)=>{
    const capsule = await Capsule.findById(req.params.id)
    if(capsule){
        res.json(capsule)
    }else {
        res.status(404).json({message:'Капсула не найдена'})
    }
})

// del capsule admin mode
// DELETE /api/capsules/:id  prv
const delCapsule =expressAsyncHandler(async (req,res)=>{
    const capsule = await Capsule.findById(req.params.id)
    if(capsule){
        await capsule.remove()
        res.json({message: 'Подборка удалена'})
    }else {
        res.status(404).json({message:'Капсула не найдена'})
    }
})

// made new capsule admin/creator mode
// POST /api/capsules  prv
const madeNewCapsule =expressAsyncHandler(async (req,res)=>{
    const capsule = new Capsule({
        name: 'New name',
        price: 0,
        user: req.user._id,
        picture: '/pic/fon.png',
        author: 'New author',
        contact: 'New contact',
        link: 'google.com',
        descr: 'New description',
    })
    const madeOkNewCapsule = await capsule.save()
    res.status(201).json(madeOkNewCapsule)
})

// Update capsule admin/creator mode
// PUT /api/capsules/:id  prv
const updateCapsule =expressAsyncHandler(async (req,res)=>{
    const {name,price,picture,author,contact,link,descr} = req.body

    const capsule = await Capsule.findById(req.params.id)

    if(capsule){
        capsule.name = name
        capsule.price = price
        capsule.picture = picture
        capsule.author = author
        capsule.contact = contact
        capsule.link = link
        capsule.descr = descr

        const updatedCapsule = await capsule.save()
        res.json(updatedCapsule)
    }else {
        res.status(404)
        console.log('Подборка не найдена')
        throw new Error('Подборка не найдена')
    }
})

//    Create new review
//    POST /api/capsules/:id/comms
const createCapsuleComm = asyncHandler(async (req, res) => {
    const { comment } = req.body
    const capsule = await Capsule.findById(req.params.id)
    if (capsule) {
        const all_block = {
            name: req.user.name,
            comment,
            user: req.user._id,
        }
        capsule.comms.push(all_block)
        capsule.countComm = capsule.comms.length
        await capsule.save()
        res.status(201).json({ message: 'Отзыв добавлен' })
    } else {
        res.status(404)
        throw new Error('Капсула не найдена')
    }
})
export {getCapsules, getCapsuleId,delCapsule,madeNewCapsule,updateCapsule,createCapsuleComm}