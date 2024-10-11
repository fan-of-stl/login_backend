const express = require("express");
const {
  registrationController,
  loginController,
  protectedDashboard,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUserById,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const routes = express.Router();

routes.post("/register", registrationController);
routes.post("/login", loginController);
routes.get("/dashboard", auth, protectedDashboard);
routes.get("/all-users", auth, getAllUsers);
routes.get("/user", auth, getUserById);
routes.put("/update", auth, updateUser);
routes.delete('/delete', auth, deleteUserById)

module.exports = routes;
