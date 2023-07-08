const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.food_item,global.food_category])
        
    } catch (error) {
        
    }
})

module.exports=router