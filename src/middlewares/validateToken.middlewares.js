const asyncHandler = require("express-async-handler");
const responseHandler = require("./responseHandler.middlewares");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        responseHandler(res, 401, "User not authorized", []);
      }
      req.user = decoded.user;
      next();
    });
  } else {
    responseHandler(res, 401, "Token is missing", []);
  }
});

module.exports = validateToken;
