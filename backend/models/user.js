const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const userSchema=new Schema({
user:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:4,
},
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);