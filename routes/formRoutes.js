const express = require("express");
const {
  submitForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} = require("../controllers/formController");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const router = express.Router();

// CREATE - Submit a form
router.post("/submit", submitForm);

// READ - Get all forms (admin only)
router.get("/admin/forms", protect, restrictTo("admin"), getForms);

// READ - Get a single form by ID (admin only)
router.get("/admin/forms/:id", protect, restrictTo("admin"), getFormById);

// UPDATE - Update a form by ID (admin only)
router.patch("/admin/forms/:id", protect, restrictTo("admin"), updateForm);

// DELETE - Delete a form by ID (admin only)
router.delete("/admin/forms/:id", protect, restrictTo("admin"), deleteForm);

module.exports = router;
