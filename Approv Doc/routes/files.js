const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/files');
const {v4:uuid4} = require('uuid');

let storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null,'upload/'),
    filename:(req,file,cb) => {
        const uniqeName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqeName);
    }
})

let upload = multer({
    storage,
    limit:{filSize:1000000 * 100},
}).single('myfile');

router.post('/',(req,res)=>{
     upload(req, res, async (err)=>{
        console.log(res.file);
        //StoreDatabase
        const file = new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path,
            size:req.file.size
        })
        console.log(file)

        if(!req.file){
            return res.json({error:'All fields are required !'})
        }

        if(err){
            return res.status(500).send({error:err.message})
        }
        
        const responseData = await file.save();
        return res.json({file:`${process.env.APP_BASE_URL}/files/${responseData.uuid}`})
        })
     //Response -> Link
});

module.exports = router;