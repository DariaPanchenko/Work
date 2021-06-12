import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const usrForm = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
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
        default: false
    },
    newCreator:{
        type: Boolean,
        required: true,
        default: false
    },
    passcode:{
        type: String,
        required: false
    }
},{timestamps:true})

usrForm.methods.matchPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
}
usrForm.pre('save', async function (next) {   if(!this.isModified('password')){next()}
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', usrForm)
export default User