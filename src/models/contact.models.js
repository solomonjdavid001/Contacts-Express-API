const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    uuid: {
      type: String,
      required: [true, "uuid is required"],
    },
    name: {
      type: String,
      required: [true, "Please provide contact name"],
    },
    email: {
      type: String,
      required: [true, "Please provide contact email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);