const User = require("../models/user.model");
const generateAccessToken = require("../utilities/generateAcessToken");
const SERVER_MESSAGES = require("../utilities/server_messages");
const {
  userValidationSchema,
  loginValidationSchema,
} = require("../utilities/validationSchema");

const registrationController = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password, username, phonenumber, profession } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const newUser = new User({
      name,
      email,
      password,
      username,
      phonenumber,
      profession,
    });

    const data = await newUser.save();

    return res.status(201).json({
      message: "User registered successfully.",
      data,
    });
  } catch (err) {
    console.error("Error in adding user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { error } = loginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: SERVER_MESSAGES.USER_NOT_FOUND });
    }

    const isPasswordValidated = await user.validatePassword(password);

    if (!isPasswordValidated) {
      return res.status(400).json({ message: SERVER_MESSAGES.LOGIN_ERROR });
    }

    const token = generateAccessToken(user);
    return res.status(200).json({ token, message: "Logged In successfully" });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const protectedDashboard = async (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome to dashboard", user: req.user });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "name username phonenumber profession"
    );

    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, password, profession, phonenumber } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (profession) user.profession = profession;
    if (phonenumber) user.phonenumber = phonenumber;

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    const { password: _, ...userData } = updatedUser.toObject();
    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "Authenticated user data retrieved successfully.",
      user,
    });
  } catch (error) {
    console.error("Error retrieving authenticated user:", error);

    return res.status(500).json({ error: "Internal server error." });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registrationController,
  loginController,
  protectedDashboard,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUserById
};
