const router = require("express").Router();
const {
  registerValidation,
  loginValidation,
  resetValidation,
  resetPasswordValidation,
} = require("../validation");
const User = require("../models").user;
const Calendar = require("../models").calendar;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let nodemailer = require("nodemailer");
const mongoose = require("mongoose");

router.use((req, res, next) => {
  console.log("Auth route accessed");
  next();
});

router.get("/test", (req, res) => {
  return res.send("Auth route working");
});

router.post("/register", async (req, res) => {
  // joi validation
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // if email exists
  const emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }
  // create new user
  let { fName, lName, email, password } = req.body;
  const newUser = new User({
    fName,
    lName,
    email,
    password,
  });
  const newCalendar = new Calendar({
    title: "default",
    owner: newUser._id,
  });
  try {
    let savedUser = await newUser.save();
    let savedCalendar = await newCalendar.save();
    return res.send({
      msg: "User registered successfully.",
      savedUser,
      savedCalendar,
    });
  } catch (err) {
    return res.status(500).send("User registration failed.");
  }
});

router.post("/login", async (req, res) => {
  // joi validation
  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const foundUser = await User.findOne({ email: req.body.email }).exec();
  if (!foundUser) {
    return res.status(400).send("Email or password is incorrect.");
  }
  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (isMatch) {
      // create json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.JWTTOKEN_SECRET);
      return res.send({
        message: "Login successfully.",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("Email or password is incorrect.");
    }
  });
});

router.post("/forgot-password", async (req, res) => {
  let { error } = resetValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email } = req.body;
  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      return res.status(400).send("Email not found.");
    }
    const secret = process.env.JWTTOKEN_SECRET + foundUser.password;
    const token = jwt.sign(
      { email: foundUser.email, _id: foundUser._id },
      secret,
      { expiresIn: "5m" }
    );
    const link = `http://localhost:5173/reset-password/${foundUser._id}/${token}`;
    // nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "routask2025@gmail.com",
        pass: "oajtheecbrzcfean",
      },
    });
    let mailOptions = {
      from: "routask2025@gmail.com",
      to: foundUser.email,
      subject: "Password Reset",
      text: link,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.send({ message: "Password reset link sent to your email." });
  } catch (err) {
    return res.status(500).send("Something went wrong.");
  }
});

router.get("/reset-password/:_id/:token", async (req, res) => {
  const { _id, token } = req.params;
  // 檢查 _id 是否為有效的 ObjectId 格式
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Invalid user ID format.");
  }
  // 檢查 Token 是否符合 JWT 結構
  // Header.Payload.Signature
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    return res.status(400).send("Invalid token structure.");
  }
  const foundUser = await User.findOne({ _id }).exec();
  if (!foundUser) {
    return res.status(400).send("User not found.");
  }
  const secret = process.env.JWTTOKEN_SECRET + foundUser.password;
  try {
    const verify = jwt.verify(token, secret);
    return res.send({ message: "Verified.", email: foundUser.email });
  } catch (err) {
    // console.log(err);
    return res.status(401).send("Not verified.");
  }
});

router.put("/reset-password/:_id/:token", async (req, res) => {
  let { error } = resetPasswordValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { _id, token } = req.params;
  let { newPassword } = req.body;
  const foundUser = await User.findOne({ _id }).exec();
  if (!foundUser) {
    return res.status(400).send("User not found.");
  }
  const secret = process.env.JWTTOKEN_SECRET + foundUser.password;
  try {
    const verify = jwt.verify(token, secret);
    if (_id === verify._id && foundUser.email === verify.email) {
      let updateUser = await User.findOneAndUpdate(
        { _id },
        { password: newPassword },
        { new: true, runValidators: true }
      );
      return res.send({
        message: "Password reset successfully.",
      });
    } else {
      return res.status(400).send("Not verified.(try block)");
    }
  } catch (err) {
    return res.status(500).send("Not verified.(500)");
  }
});

router.delete("/delete/:_id", async (req, res) => {
  const userId = req.params._id;
  try {
    await User.deleteOne({ _id: userId }).exec();
    return res.send("User deleted successfully.");
  } catch (err) {
    return res.status(500).send("User deletion failed.");
  }
});

module.exports = router;
