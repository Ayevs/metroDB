const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb+srv://alex:1234@cluster0.h9igln0.mongodb.net/MetroDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("Users", UserSchema, "Users");

const users = [
  { username: "manager", password: "admin" },
  { username: "assistant", password: "ilovezebras" },
  { username: "alexandr", password: "qwerde" },
  //we can add as many more users as we need and they will be hardcoded into the user collection of the metrodb server
];

const generateHashedPasswords = async () => {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new User({
        username: user.username,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(
        `User Has been added to the collection with a hashed password.`
      );
    }
  } catch (error) {
    console.log(
      `attempted to add user to the collection, but was unable to `,
      error
    );
  } finally {
    mongoose.connection.close();
  }
};

generateHashedPasswords();
