import express from 'express'
import Capsules from './data/Capsules.js'
import dotenv from 'dotenv'
const app = express()
dotenv.config()

app.get('/',(req,res)=>{
    res.send('API is include')
})

app.get('/api/capsules',(req,res)=>{
    res.json(Capsules)

})
app.get('/api/capsules/:id',(req,res)=>{
    const capsule = Capsules.find((i)=>i._id === Number.parseInt(req.params.id))
    res.json(capsule)
})
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server - OK on the port ${PORT}`))



