import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

// Map thrown errors to a sensible HTTP status instead of always answering 400
const handleError = (res, error) => {
  console.error(error);

  if (error?.code === 11000) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (error?.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  if (
    error?.name === "MongooseError" ||
    error?.name === "MongoServerSelectionError" ||
    error?.name === "MongoNetworkError"
  ) {
    return res.status(503).json({
      message: "Database connection failed. Please try again in a moment.",
    });
  }

  return res.status(500).json({ message: "Something went wrong" });
};

const normalizeEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

// Controller for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = normalizeEmail(req.body.email);

    // check if required fields are present
    if (!name?.trim() || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name.trim(),
      email,
      password: hashedPassword,
    });

    // return success message
    const token = generateToken(newUser._id);
    newUser.password = undefined; // hide password

    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    return handleError(res, error);
  }
};

// Controller for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    const email = normalizeEmail(req.body.email);

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // return success message
    const token = generateToken(user._id);
    user.password = undefined; // hide password

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return handleError(res, error);
  }
};

// Controller for getting user by id
// GET: /api/users/data
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    // check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // return user (client reads `data.user`)
    user.password = undefined; // hide password
    return res.status(200).json({ user });
  } catch (error) {
    return handleError(res, error);
  }
};

// Controller for getting user resumes
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    // return user resumes
    const resumes = await Resume.find({ userId });

    return res.status(200).json({ resumes });
  } catch (error) {
    return handleError(res, error);
  }
};
