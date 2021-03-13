import express from 'express'
import Capsule from '../my_db/capsuleMod.js'
import expressAsyncHandler from 'express-async-handler'
const router = express.Router()

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
}))
export default router