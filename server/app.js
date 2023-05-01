express = require("express");
require("./models/User");
require("./models/Canteen");
require("./models/Order");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());
const str =
  "mongodb+srv://napan:iamnapan@cluster0.uxgviuz.mongodb.net/?retryWrites=true&w=majority";
const User = mongoose.model("User");
const Order = mongoose.model("Order");
const Canteen = mongoose.model("Canteen");
mongoose.connect(str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//functions
app.post("/", (req, res) => {
  const { name, email } = req.body;
  const data = new User({
    name: name,
    email: email,
  });
  data.save();
  return res.json({ message: "Success" });
});
app.post("/checkout", (req, res) => {
  const { itemList, email, canteenName } = req.body;
  let x = Math.floor(Math.random() * 1000 + 1);
  const data = new Order({
    items: itemList,
    email: email,
    canteen: canteenName,
    OTP: x,
  });
  data.save();
  return res.json({ message: "Success" });
});
app.post("/CanteenData", (req, res) => {
    const { name } = req.body;
    Canteen.find({ name: name}, function (err, value) {
        if (err) return handleError(err);
        return res.json({ data: value });
      });
  });
  app.post("/getCanteenData", (req, res) => {
    Canteen.find({}, function (err, value) {
        if (err) return handleError(err);
        return res.json({ data: value });
      });
  });
  app.post("/searchOrders", (req, res) => {
    const {email}=req.body;
    Order.find({email:email}, function (err, value) {
        if (err) return handleError(err);
        return res.json({ data: value });
      });
  });
app.post("/OpenCloseCanteen", (req, res) => {
  const { name, option } = req.body;
  Canteen.findOneAndUpdate(
    { name: name },
    { $set: { status: option } },
    { new: true, upsert: true },
    function (err) {
      if (err) {
        // err: any errors that occurred
        console.log(err);
      }
    }
  );
  return res.json({ message: "Success" });
});
app.post("/orderCooked", (req, res) => {
  const { id } = req.body;
  Order.findOneAndUpdate(
    { _id: id },
    { $set: { orderStatus: "Get Your Order" } },
    { new: true, upsert: true },
    function (err) {
      if (err) {
        // err: any errors that occurred
        console.log(err);
      }
    }
  );
  return res.json({ message: "Success" });
});
app.post("/check", (req, res) => {
  const { email, name } = req.body;
  User.find({ email: email }, function (err, person) {
    if (err) return handleError(err);
    if (!person || Object.keys(person).length === 0) {
      const acc = new User({
        name: name,
        email: email,
      });
      acc.save();
      User.find({ email: email }, function (err, value) {
        if (err) return handleError(err);
        return res.json({ data: value });
      });
    } else {
      res.json({ data: person });
    }
  });
});
app.post("/canteenLogin", (req, res) => {
  const { email, password } = req.body;
  User.find({ email: email, password: password }, function (err, value) {
    if (err) return handleError(err);
    return res.json({ data: value });
  });
});
app.post("/getorders", (req, res) => {
  const { name } = req.body;
  Order.find({ canteen: name }, function (err, value) {
    if (err) return handleError(err);
    return res.json({ orders: value });
  });
});
app.post("/orderStatus", (req, res) => {
  const { id, value } = req.body;
  Order.findOneAndUpdate(
    { _id: id },
    { $set: { orderStatus: value } },
    { new: true, upsert: true },
    function (err) {
      if (err) {
        // err: any errors that occurred
        console.log(err);
      }
      return res.json({ message: "Success" });
    }
  );
});
app.post("/signup", (req, res) => {
  const { email, name } = req.body;
  const data = new User({
    name: name,
    email: email,
  });
  data.save();
  return res.json({ message: "Success" });
});
app.post("/changePassword", (req, res) => {
  const { name, newPassword } = req.body;
  User.findOneAndUpdate(
    { name: name },
    { $set: { password: newPassword } },
    { new: true, upsert: true },
    function (err) {
      if (err) {
        // err: any errors that occurred
        console.log(err);
      }
      return res.json({ message: "Success" });
    }
  );
});
//connection
mongoose.connection.on("connected", () => {
  console.log("connected to mongoose");
});
app.get("/", (req, res) => {
  res.send("welcome to nodejs");
});
app.listen(3000, () => {
  console.log("server running");
});
