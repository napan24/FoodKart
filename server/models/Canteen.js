const mongoose=require('mongoose');

const Canteen=new mongoose.Schema({
    name:{type:String,require:true},
    status:{type:String,default:"Close"}
})
mongoose.model("Canteen",Canteen)