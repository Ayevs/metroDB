const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const emailjs = require("emailjs-com");

const app = express();
//body parser which handles the json
//gives us the abilityt to access data from the post request vio req.body
app.use(express.json());

//enable all cors requests
app.use(cors());

//connect to the mongo db atlas
mongoose
  .connect("mongodb+srv://alex:1234@cluster0.h9igln0.mongodb.net/MetroDB")
  .then(() => console.log("MetroDB connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String, //this passowrd is gona be stored in the db as a hashed string
  role: String,
});

const ItemSchema = new mongoose.Schema({
  name: String,
  department: String,
  price: Number,
  quantity: Number,
  brand: String,
});

const OnSaleSchema = new mongoose.Schema({
  name: String,
  department: String,
  price: Number,
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  quantity: Number,
  brand: String,
});


const User = mongoose.model("Users", UserSchema, "Users");
const Items = mongoose.model("Items", ItemSchema, "Items");
const OnSale = mongoose.model("OnSale", OnSaleSchema, "OnSale");

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      // if you login and youre username is not in the server then you cannot login
      console.log("user not found while trying to login");
      return res.status(401).send({ error: "invalid username or password" });
    }

    //we checkthe password here
    const isMatch = await bcrypt.compare(password, user.password); //matching the password that was used to login and comparing it to the password that was stored in the database
    if (!isMatch) {
      console.log("users password was wrong while attempting to login");
      return res.status(401).send({ error: "Invalid username or password" });
    }

    //now we create a jwt token for the this session
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "yourJWTSecret",
      {
        expiresIn: "1h",
      }
    );
    console.log(
      `User: ${username} with role ${user.role} logged in and given the token`
    );
    res.json({ token, role: user.role, success: true });
  } catch (error) {
    console.log("there was a internal server error trying to login", error);
    res.status(500).send({ error: "internal server error" });
  }
});

app.get("/items", async (req, res) => {
  Items.find()
    .then((item) => res.json(item))
    .catch((err) => res.json(err));
});

app.get("/onsale", async (req, res) => {
  OnSale.find()
    .then((item) => res.json(item))
    .catch((err) => res.json(err));
});

app.post("/items/increase-quantity/:id", async (req, res) => {
  const itemId = req.params.id;
  console.log("Requested item ID:", itemId);
  const { amount } = req.body;

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(itemId);
    if (!isValidObjectId){
      return res.status(400).json({error: "invalid item id format"});
    }
    const item = await Items.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "item not found" });
    }

    const updatedItem = await Items.findOneAndUpdate(
      { _id: itemId },
      { $inc: { quantity: amount } },
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    console.error("error increasing quantity:", error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.post("/items/decrease-quantity/:id", async (req, res) => {
  const itemId = req.params.id;
  const amount = parseInt(req.body.amount, 10) || 1;

  try {
    const item = await Items.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await item.decreaseQuantity(amount);

    res.json({ success: true, message: "decreased quantity" });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//we set up the server to run
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
