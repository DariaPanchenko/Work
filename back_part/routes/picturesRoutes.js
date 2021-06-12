import multer from 'multer'
import express from 'express'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({destination(req,file,cb){
    cb(null,'front_part/public/pic/')
    }, filename(req,file,cb){
    cb(null,`${file.originalname}`)
    },})
function  checkFileType(file,cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype){
        return cb(null, true)
    } else {
        cb(null,false)
    }
}
const upload = multer({
    storage,
    fileFilter: function (req,file,cb){
        checkFileType(file,cb)
    },
})

router.post('/',upload.single('picture'), (req,res)=>{
    res.send(`/${req.file.path}`)
})
export default router