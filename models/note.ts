import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence");

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },
});

noteSchema.set("timestamps", true);
noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500,
});

export default mongoose.model("notes", noteSchema);
