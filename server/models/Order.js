const mongoose=require('mongoose');

const Order=new mongoose.Schema({
    email:{type:String,require:true},
    items:{type:Array,require:true},
    canteen:{type:String,require:true},
    orderStatus:{type:String,default:"Awaiting Confirmation"}
})
mongoose.model("Order",Order)