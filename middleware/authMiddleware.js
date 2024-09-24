const jwt = require("jsonwebtoken");

const handleError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

exports.protect = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleError(res, 401, "No token provided or invalid format.");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return handleError(res, 401, "Token has expired. Please log in again.");
    }

    if (err.name === "JsonWebTokenError") {
      return handleError(res, 401, "Invalid token. Please log in again.");
    }

    return handleError(
      res,
      500,
      "An error occurred during token verification."
    );
  }
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    console.log( roles);
    try {
      if (!roles.includes(req.user.role)) {
        return handleError(
          res,
          403,
          "Access denied. Insufficient permissions."
        );
      }
      
      next();
    } catch (err) {
      return handleError(
        res,
        500,
        "An error occurred during role verification."
      );
    }
  };
