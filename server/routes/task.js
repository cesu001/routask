const { addCalendarValidation, addTaskValidation } = require("../validation");
const router = require("express").Router();
const User = require("../models").user;
const Calendar = require("../models").calendar;
const Task = require("../models").task;

router.get("/calendar/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundCalendars = await Calendar.find({ owner: _id }).exec();
    if (foundCalendars.length > 0) {
      return res.send({
        message: "Calendars found.",
        calendars: foundCalendars,
      });
    } else {
      return res.send({
        message: "Calendars not found.",
        calendars: [],
      });
    }
  } catch (err) {
    return res.status(500).send("Fetching calendar failed.");
  }
});

router.post("/calendar", async (req, res) => {
  let { error } = addCalendarValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { title } = req.body;
  try {
    let newCalendar = new Calendar({
      title,
      owner: req.user._id,
    });
    let savedCalendar = await newCalendar.save();
    return res.send({
      message: "New calendar added.",
      savedCalendar,
    });
  } catch (err) {
    return res.status(500).send("Add calendar failed.");
  }
});

router.put("/calendar/edit/:_id", async (req, res) => {
  let { error } = addCalendarValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { _id } = req.params;
  let { title } = req.body;
  try {
    let updatedCalendar = await Calendar.findOneAndUpdate(
      { _id },
      { title },
      { new: true, runValidators: true }
    );
    return res.send({
      message: "Calendar updated.",
      updatedCalendar,
    });
  } catch (err) {
    return res.status(500).send("Update calendar failed.");
  }
});

router.delete("/calendar/delete/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    const foundCalendar = await Calendar.findOne({ _id }).exec();
    const tasksInCalendar = await Task.find({ calendar: _id }).exec();
    if (!foundCalendar) {
      return res.status(400).send("Calendar not found.");
    }
    await Calendar.deleteOne({ _id }).exec();
    await Task.deleteMany({ calendar: _id }).exec();
    return res.send({
      message: "Calendar deleted.",
    });
  } catch (err) {
    return res.status(500).send("Delete calendar failed.");
  }
});

router.get("/fetch", async (req, res) => {
  try {
    let foundTasks = await Task.find({ owner: req.user._id }).exec();
    if (foundTasks.length > 0) {
      return res.send({
        message: "Tasks found.",
        tasks: foundTasks,
      });
    } else {
      return res.send({
        message: "Tasks not found.",
        tasks: [],
      });
    }
  } catch (err) {
    return res.status(500).send("Fetching tasks failed.");
  }
});

router.post("/add", async (req, res) => {
  let { error } = addTaskValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let {
    title,
    calendar,
    priority,
    progress,
    date,
    cycle,
    cycleInterval,
    location,
    notes,
  } = req.body;
  try {
    let newTask = new Task({
      owner: req.user._id,
      title,
      calendar,
      priority,
      progress,
      date,
      cycle,
      cycleInterval,
      location,
      notes,
    });
    let savedTask = await newTask.save();
    return res.send({
      message: "New task added.",
      savedTask,
    });
  } catch (err) {
    return res.status(500).send("Add task failed.");
  }
});

router.put("/edit/:_id", async (req, res) => {
  let { error } = addTaskValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { _id } = req.params;
  let {
    title,
    calendar,
    priority,
    progress,
    date,
    cycle,
    cycleInterval,
    location,
    notes,
  } = req.body;
  try {
    let updatedTask = await Task.findOneAndUpdate(
      { _id },
      {
        title,
        calendar,
        priority,
        progress,
        date,
        cycle,
        cycleInterval,
        location,
        notes,
      },
      { new: true, runValidators: true }
    );
    return res.send({
      message: "Task updated.",
      updatedTask,
    });
  } catch (err) {
    return res.status(500).send("Update task failed.");
  }
});

router.put("/archive/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let updatedTask = await Task.findOneAndUpdate(
      { _id },
      {
        archived: true,
      },
      { new: true, runValidators: true }
    );
    return res.send({
      message: "Task archived.",
      updatedTask,
    });
  } catch (err) {
    return res.status(500).send("Archive task failed.");
  }
});

router.delete("/delete/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    const foundTask = await Task.findOne({
      _id,
    }).exec();
    if (!foundTask) {
      return res.status(400).send("Task not found.");
    }
    await Task.deleteOne({ _id }).exec();
    return res.send({
      message: "Task deleted.",
    });
  } catch (err) {
    return res.status(500).send("Delete task failed.");
  }
});

module.exports = router;
