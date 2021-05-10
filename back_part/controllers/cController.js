import Capsule from '../my_db/capsuleMod.js'
import expressAsyncHandler from 'express-async-handler'
import asyncHandler from 'express-async-handler'

// GET /api/capsules
const getCapsules=expressAsyncHandler(async (req,res)=>{
    const Capsules = await Capsule.find({})
    res.json(Capsules)
})

// GET /api/capsules:id
const getCapsuleId=expressAsyncHandler(async (req,res)=>{
    const capsule = await Capsule.findById(req.params.id)
    if(capsule){
        res.json(capsule)
    }else {
        res.status(404).json({message:'Капсула не найдена'})
    }
})

//    Create new review
//    POST /api/capsules/:id/comms
// @access  Private
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
export {getCapsules, getCapsuleId,createCapsuleComm}