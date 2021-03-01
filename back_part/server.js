const express = require('express')
const Capsules = require('./data/Capsules')
const app = express()

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
app.listen(5000, console.log('Server OK 5000'))



