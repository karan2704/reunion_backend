const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {

  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if(!token) {
    res.status(401).send("Access denied. No token provided.")
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    
    req.user = decoded;
    next()
  } catch (err) {    
    res.status(400).send("Invalid token.");
  }
};

module.exports = authorize;