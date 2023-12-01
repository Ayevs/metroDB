const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

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
});

const ItemSchema = new mongoose.Schema({
  name: String,
  department: String,
  price: Number,
  quantity: Number,
});

const User = mongoose.model("Users", UserSchema, "Users");
const Item = mongoose.model("Items", ItemSchema, "Items");

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
    const token = jwt.sign({ userId: user._id }, "yourJWTSecret", {
      expiresIn: "1h",
    });
    res.send({ token, success: true });
    console.log(`User: ${username} was logged in and given the token`);
  } catch (error) {
    console.log("there was a internal server error trying to login");
    res.status(500).send({ error: "internal server error" });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({ error: "no token, authetication denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "token is not valid" });
  }
};

app.get("/items", authMiddleware, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//we set up the server to run
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
