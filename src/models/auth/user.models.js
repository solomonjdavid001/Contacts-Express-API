const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    uuid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: [true, "Please provide user name"],
    },
    email: {
      type: String,
      required: [true, "Please provide user email"],
    },
    password: {
      type: String,
      required: [true, "Please provide user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
