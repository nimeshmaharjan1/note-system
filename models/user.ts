import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  roles: [
    {
      type: String,
      default: "employee",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.set("timestamps", true);

export default mongoose.model("users", userSchema);
