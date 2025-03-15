import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import { request } from "express";

//  Create new user
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all required fields.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).send("User already exists.");
  }

  //make password bcrypt
  const salt = await bcrypt.genSalt(10); //10 means more the number more the stronger but above 10 is slow down applications
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    //generate token
    generateToken(res, user._id);
    //sending res to user
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid details.");
  }
});

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and password.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isValidPassword) {
      generateToken(res, existingUser._id);

      //sending res to user
      res.json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });

      return;
    }
  }
};

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully." });
});

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//get details of current user

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  } else {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

//update user profile
const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    //update user fields like username body me new aya hai to usko varna stick to old one
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      //make password bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    //first we save user to db and then send res to user.
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//admin power;
//delete user
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //params becoz "/:id"

  if (user) {
    if (user.isAdmin) {
      res.status(403);
      throw new Error("You can't delete an admin user.");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: `User with id ${req.params.id} has been deleted.` });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//get user
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//update user as admin
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.user.isAdmin);
    //first we save user to db and then send res to user.
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});
export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
};
