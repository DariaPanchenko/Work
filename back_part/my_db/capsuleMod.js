import mongoose from 'mongoose'
const comm = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    comment:{
        type: String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{timestamps:true})

const capsuleForm = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: true
    },
    descr:{
        type: String,
        required: true
    },
    comms: [comm],
    commN:{
        type: Number,
        required: true,
        default: 0
    },
    author:{
        type: String,
        required: true,
    },
    contact:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    countStock:{
        type: Number,
        required: true,
        default: 0
    }
},{timestamps:true})

const Capsule = mongoose.model('Capsule',capsuleForm)

export default Capsule