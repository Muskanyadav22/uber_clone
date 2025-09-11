const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check both role and userType for compatibility
      const userRole = decoded.role || decoded.userType;
      
      if (requiredRole && userRole !== requiredRole) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;