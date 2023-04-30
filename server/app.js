express=require('express');
require("./models/User");
require("./models/Order");
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

app.use(bodyParser.json());
const str="mongodb+srv://napan:iamnapan@cluster0.uxgviuz.mongodb.net/?retryWrites=true&w=majority"
const User=mongoose.model("User");
const Order=mongoose.model("Order");

mongoose.connect(str,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//functions
app.post("/", (req, res) => {
    const { name, email} = req.body;
    const data = new User({
        name: name,
        email: email
    })
    data.save();
    return res.json({ message: "Success" });
})
app.post("/checkout", (req, res) => {
    const { itemList, email,canteenName} = req.body;
    const data = new Order({
        items: itemList,
        email: email,
        canteen:canteenName
    })
    data.save();
    return res.json({ message: "Success" });
})
app.post("/check", (req, res) => {
    console.log("check");
    const {email,name} = req.body;
    User.find({ email: email },
        function (err, person) {
            console.log(person);
            if (err) return handleError(err);
            if(!person||Object.keys(person).length === 0){
                console.log('okay');
                const acc = new User({
                    name: name,
                    email: email
                })
                acc.save();
                User.find({ email: email },
                    function (err, value) {
                        console.log(value);
                        if (err) return handleError(err);
                        return res.json({ data: value });
                    });
            }
            else{
                res.json({ data: person });
            }   
        });
    
})
app.post("/canteenLogin", (req, res) => {
    const {email,password} = req.body;
    User.find({ email: email,password:password },
        function (err, value) {
            console.log(value);
            if (err) return handleError(err);
            return res.json({ data: value });
        });
})
app.post("/getorders", (req, res) => {
    const {name} = req.body;
    console.log(name);
    Order.find({ canteen:name },
        function (err, value) {
            console.log(value);
            if (err) return handleError(err);
            return res.json({ orders: value });
        });
})
app.post("/orderStatus", (req, res) => {
    const {id,value} = req.body;
    Order.findOneAndUpdate(
        { "_id": id },
        { "$set": { "orderStatus": value} },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
            return res.json({ message: "Success" });
        })
})
app.post("/signup", (req, res) => {
    console.log("signup");
    const {email,name} = req.body;
    const data = new User({
        name: name,
        email: email
    })
    data.save();
    return res.json({ message: "Success" });
})
app.post("/changePassword", (req, res) => {
    const {name,newPassword} = req.body;
    console.log(name,newPassword)
    User.findOneAndUpdate(
        { "name": name },
        { "$set": { "password": newPassword} },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
            return res.json({ message: "Success" });
        })
})
//connection
mongoose.connection.on("connected",()=>{
    console.log("connected to mongoose");
})
app.get('/',(req,res)=>{
    res.send("welcome to nodejs");
})
app.listen(3000,()=>{
    console.log("server running");
});