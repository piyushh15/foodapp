const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtsecret="mynameispiyushnicetomeetyou";

router.post('/createuser',

    // username must be an email
    [body('email','incorrect email').isEmail(),
    // password must be at least 5 chars long
    body('password','incorrect password').isLength({ min: 5 })],

    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //almost all functions of bcrypt are asynchronous use await async
        const salt=await bcrypt.genSalt(10);
        let secpassword=await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secpassword
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })

        }

    })



    router.post('/loginuser',

    
    [body('email').isEmail(),
    body('password','password is too small').isLength({ min: 5 })],


    async (req, res) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email=req.body.email;

        try {

           let useremail=await User.findOne({email});

           if(!useremail){
            return res.status(400).json({ errors:"username not found" });
                
           }
           const pwdcompare=await bcrypt.compare(req.body.password,useremail.password);

           if(!pwdcompare){
            return res.status(400).json({ errors: "password incorrect" });

           }
           const data={
            user:{
                id:useremail.id
            }
           }
           const authToken=jwt.sign(data,jwtsecret)
           return res.json({success:true,authToken:authToken})
        } catch (error) {
            console.log(error)
            res.json({ success: false })

        }

    })

module.exports = router;
