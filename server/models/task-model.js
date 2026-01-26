const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  calendar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Calendar",
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: true,
  },
  progress: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cycle: {
    type: Boolean,
    default: false,
  },
  cycleInterval: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
