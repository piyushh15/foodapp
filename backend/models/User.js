const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
       
    },
    location:{
        type:String,
        
    },
    email:{
        type:String,
        
        
    },
    password:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    },

  });

  module.exports = mongoose.model('user',UserSchema)