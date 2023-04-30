const mongoose=require('mongoose');

const Order=new mongoose.Schema({
    email:{type:String,require:true},
    items:{type:Array,require:true},
    canteen:{type:String,require:true},
    orderStatus:{type:String,default:"Awaiting Confirmation"},
    OTP:{type:String,required:true}
})
mongoose.model("Order",Order)