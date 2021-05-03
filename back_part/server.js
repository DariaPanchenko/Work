import express from 'express'
import connection_DB from './config/database.js'
import cRoutes from './routes/cRoutes.js'
import uRoutes from './routes/uRoutes.js'
import dotenv from 'dotenv'
const app = express()
dotenv.config()
connection_DB()

app.use(express.json())
app.get('/',(req,res)=>{
    res.send('API is include')
})
app.use('/api/capsules',cRoutes)
app.use('/api/users',uRoutes)

app.use((err,req,res,next) => {
    const statusCode = (res.statusCode === 200)?200:res.statusCode
    res.status(statusCode)
    res.json({message:err.message,})

    const error = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(error)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server - OK on the port ${PORT}`))



