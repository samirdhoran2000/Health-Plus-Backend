const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
      minlength: [8, "Name must be at least 8 characters long"],
    },
    patientNumber: {
      type: String,
      required: [true, "Number is required"],
      minlength: [10, "Minimum length 10 is required"],
      trim: true,
    },
    patientGender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      lowercase: true,
    },
    appointmentTime: {
      type: Date,
      required: [true, "Date is required"],
    },
    preferredMode: {
      type: String,
      required: [true, "preferredMode is required"],
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
