const router = require("express").Router();
const User = require("../models").user;
const {
  updateProfileValidation,
  changePasswordValidation,
} = require("../validation");

router.get("/info/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundUser = await User.findOne({ _id }).exec();
    return res.send({
      user: foundUser,
    });
  } catch (err) {
    return res.status(500).send("Fetching user profile failed.");
  }
});

router.put("/info/:_id", async (req, res) => {
  let { error } = updateProfileValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { _id } = req.params;
  let { fName, lName } = req.body;
  try {
    let updatedUser = await User.findOneAndUpdate(
      { _id },
      { fName, lName },
      { new: true, runValidators: true }
    );
    return res.send({
      message: "User info updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).send("User info update failed.");
  }
});

router.put("/password/:_id", async (req, res) => {
  let { error } = changePasswordValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { _id } = req.params;
  let { oldPassword, newPassword } = req.body;
  const foundUser = await User.findOne({ _id }).exec();
  if (!foundUser) {
    return res.status(400).send("User not found.");
  }
  foundUser.comparePassword(oldPassword, async (err, isMatch) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (isMatch) {
      try {
        let updateUser = await User.findOneAndUpdate(
          { _id },
          { password: newPassword },
          { new: true, runValidators: true }
        );
        return res.send({
          message: "Password changed successfully.",
        });
      } catch (err) {
        console.log(err);
        return res.status(500).send("Password change failed.");
      }
    } else {
      return res.status(401).send("Old password is incorrect.");
    }
  });
});

module.exports = router;
