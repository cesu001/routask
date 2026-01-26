const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

// instance methods
userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (err) {
    return cb(err, result);
  }
};

// mongoose middleware
// pre-save for hash password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

// userSchema.pre("findOneAndUpdate", async function (next) {
//   if (this.isModified("password")) {
//     const newHashValue = await bcrypt.hash(this.password, 10);
//     this.password = newHashValue;
//   }
//   next();
// });

userSchema.pre("findOneAndUpdate", async function (next) {
  // `this` 在查詢中間件中指向 Query 物件
  const update = this.getUpdate();

  // 檢查更新操作中是否包含 'password' 欄位
  if (update && update.password) {
    try {
      // 執行雜湊
      const hashedPassword = await bcrypt.hash(update.password, 10);

      // 將查詢中的密碼替換為雜湊值
      update.password = hashedPassword;
      // 或者使用 $set 語法（如果您的更新使用了 $set）
      // if (update.$set && update.$set.password) {
      //   update.$set.password = hashedPassword;
      // }

      this.setUpdate(update); // 將修改後的更新物件傳回給 Mongoose
    } catch (error) {
      return next(error);
    }
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
