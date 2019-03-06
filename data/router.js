const express = require('express');
const db = require('./db.js');
const router = express.Router();

router.post('/', async (req, res)=>{
    try{
        const post = await db.insert(req.body);
        if(post){
            res.status(201).json(post)
        }
        else{
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    }
    catch(error){
        res.
    }
})

module.exports = router;