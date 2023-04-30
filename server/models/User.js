const mongoose=require('mongoose');

const User=new mongoose.Schema({
    name:{type:String},
    email:{type:String,require:true},
    password:{type:String,default:"111"}  
})
mongoose.model("User",User)