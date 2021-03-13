import mongoose from 'mongoose'

const answr = mongoose.Schema({
    count:{
        type:Number,
        required:true,
        default: 1
    },
    variant:{
        type: String,
        required: true
    }
},{timestamps:true})



const testForm = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    quest: {
        type: String,
        required: true
    },

    answers: [answr],

    true_answer: {
        type: Number,
        required:true
    }

},{timestamps:true})

const Tests = mongoose.model('Tests',testForm)

export default Tests