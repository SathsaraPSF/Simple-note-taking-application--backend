const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  note: {
    type: String,
    required: [true, "Note is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
});

const Note = mongoose.model("Note", schema);
module.exports = Note;
