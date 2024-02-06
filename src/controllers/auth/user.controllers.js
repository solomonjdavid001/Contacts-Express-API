const asyncHandler = require("express-async-handler");
const responseHandler = require("../../middlewares/responseHandler.middlewares");
const bcrypt = require("bcrypt");
const User = require("../../models/auth/user.models");
const jwt = require("jsonwebtoken");

//@desc Register an user
//@route POST /api/v1/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    responseHandler(res, 400, "All fields are necessary", []);

  const userExits = await User.findOne({ email });
  if (userExits) responseHandler(res, 400, "User already Registered!", []);

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    username,
    email,
    password: hashedPassword,
  });
  responseHandler(res, 200, "User Registered", []);
});

//@desc Login user
//@route POST /api/v1/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password))
    responseHandler(res, 400, "All fields are necessary", []);

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    responseHandler(res, 200, "User Logged-In", {
      accessToken: accessToken,
    });
  } else {
    responseHandler(res, 401, "email or password is not valid", []);
  }
});

//@desc current user
//@route GET /api/v1/users/current
const currentUser = asyncHandler(async (req, res) => {
  responseHandler(res, 200, "Current User data", {
    userInfo: req.user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};