import Capsule from '../my_db/capsuleMod.js'
import expressAsyncHandler from 'express-async-handler'
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
        res.status(404).json({message:'Capsule not found'})
    }
})

export {getCapsules, getCapsuleId}