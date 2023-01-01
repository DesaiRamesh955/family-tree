const mongoose = require("mongoose")

const familySchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true
    },
    person:{
        type:String,
        trim:true
    },
    parentId:{
        type:String
    },
    gender:{
        required:true,
        type:String,
        enum:['male','female']
    },
    image:{
        required:true,
        type:String
    },

},{timestamps:true})


module.exports = mongoose.model("Family",familySchema)