const mongoose = require("mongoose");
const { Schema } = mongoose;

const calendarSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Calendar", calendarSchema);
