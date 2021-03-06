import express from 'express'
import connection_DB from './config/database.js'
import cRoutes from './routes/cRoutes.js'
import uRoutes from './routes/uRoutes.js'
import pRoutes from './routes/pRoutes.js'
import picturesRoutes from './routes/picturesRoutes.js'
import path from 'path'
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
app.use('/api/paid_orders', pRoutes)
app.use('/api/upload', picturesRoutes)
app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL))

const __dirname = path.resolve()
app.use('/front_part/public/pic',express.static(path.join(__dirname,'/front_part/public/pic')))

app.use((err,req,res,next) => {
    const statusCode = (res.statusCode === 200)?200:res.statusCode
    res.status(statusCode)
    res.json({message:err.message,})

    const error = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(error)
})

const PORT = process.env.PORT || 5001
app.listen(PORT, console.log(`Server - OK on the port ${PORT}`))



