const Form = require("../models/formModel");

const handleError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

// CREATE - Submit a new form
exports.submitForm = async (req, res) => {
  try {
    const {
      patientName,
      patientNumber,
      patientGender,
      appointmentTime,
      preferredMode,
    } = req.body;

    if (
      !patientName ||
      !patientNumber ||
      !patientGender ||
      !appointmentTime ||
      !preferredMode
    ) {
      return handleError(
        res,
        400,
        "Please provide all required fields (patientName, patientNumber, patientGender, appointmentTime, preferredMode)."
      );
    }

    const form = await Form.create({
      patientName,
      patientNumber,
      patientGender,
      appointmentTime,
      preferredMode,
    });

    res.status(201).json({
      message: "Form submitted successfully",
      form: {
        id: form._id,
        patientName: form.patientName,
        patientNumber: form.patientNumber,
        patientGender: form.patientGender,
        appointmentTime: form.appointmentTime,
        preferredMode: form.preferredMode,
      },
    });
  } catch (error) {
    console.error("Error submitting form: ", error);
    return handleError(
      res,
      500,
      "An error occurred while submitting the form."
    );
  }
};

// READ - Get all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    if (!forms.length) {
      return res.status(404).json({ message: "No forms found." });
    }

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms: ", error);
    return handleError(res, 500, "An error occurred while fetching the forms.");
  }
};

// READ - Get a single form by ID
exports.getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return handleError(res, 400, "Form ID is required.");
    }

    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form: ", error);
    return handleError(res, 500, "An error occurred while fetching the form.");
  }
};

// UPDATE - Update a form by ID
exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return handleError(res, 400, "Form ID is required.");
    }

    const form = await Form.findByIdAndUpdate(id, updates, { new: true });

    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    res.status(200).json({
      message: "Form updated successfully",
      form: {
        id: form._id,
        patientName: form.patientName,
        patientNumber: form.patientNumber,
        patientGender: form.patientGender,
        appointmentTime: form.appointmentTime,
        preferredMode: form.preferredMode,
      },
    });
  } catch (error) {
    console.error("Error updating form: ", error);
    return handleError(res, 500, "An error occurred while updating the form.");
  }
};

// DELETE - Delete a form by ID
exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return handleError(res, 400, "Form ID is required.");
    }

    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    await Form.findByIdAndDelete(id);

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form: ", error);
    return handleError(res, 500, "An error occurred while deleting the form.");
  }
};
