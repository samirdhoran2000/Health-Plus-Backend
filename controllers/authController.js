const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const handleError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return handleError(
        res,
        400,
        "Please provide all required fields (name, email, password, role)."
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleError(res, 400, "User with this email already exists.");
    }

    const user = new User({ name, email, password, role });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error: ", error);
    return handleError(
      res,
      500,
      "An error occurred while registering the user."
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleError(res, 400, "Please provide both email and password.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return handleError(res, 401, "Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return handleError(res, 401, "Invalid email or password.");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.error("Login error: ", error);
    return handleError(res, 500, "An error occurred while logging in.");
  }
};
