const mongoose = require('mongoose')

//Creating a schema and include the required input from the fontend.
const signUpTemplate = new mongoose.Schema({
    imageUrl:{
       type:String,
       required:true
    },
    firstName:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports =  mongoose.model('myTable', signUpTemplate)