import mongoose from 'mongoose'

const connection_DB = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO,{
            useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true,
        })
        console.log(`Mongo connect ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error ${error.message}`)
        process.exit(1)
    }
}

export default connection_DB