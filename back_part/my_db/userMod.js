import mongoose from 'mongoose'


const usrForm = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        required: true,
        default:false
    },
   mark:{
        type: Number,
        required: true,
        default: 0
    }
},{timestamps:true})

const User = mongoose.model('User',usrForm)

export default User