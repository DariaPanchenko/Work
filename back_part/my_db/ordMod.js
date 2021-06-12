import mongoose from 'mongoose'
const ordForm = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    orderItm:[{
        name: {
            type: String,
            required: true
        },
        picture:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        capsule:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'Capsule'
        },
        link: {
            type: String,
            required: true,
        },
    }],
    payment:{
        type: String,
        required: true
    },
    paymentResult: {
        id: {type:String},
        res: {type:String},
        update_time: {type:String},
        email_addr: {type:String}
    },
    allPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    paidFinish:{
        type: Boolean,
        required: true,
        default:false
    },
    datePaid:{
        type:Date
    }

},{timestamps:true})
const Ord = mongoose.model('Ord',ordForm)

export default Ord