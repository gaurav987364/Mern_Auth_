import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userControler.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//creating user route
// router.route("/").post(createUser); withour admin route
//check if user is admin or not admin
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

//login user route
router.post("/auth", loginUser); //using POST method

//logout user route
router.post("/logout", logoutUser); //using POST method

//get all details of user
// router.route("/profile").get(authenticate, getUserProfile);

// get user profile and now update this also
router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateCurrentUser);

//getting , deleting and updating user data from isAdmin side;
//we put authenticate and authorizedadmin because tabhi delete krege jo admin hoga varna nahi.
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);
export default router;
