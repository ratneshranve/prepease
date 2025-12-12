import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// helper function to generate unique studentId
const generateStudentId = async () => {
  let studentId;
  let exists = true;

  while (exists) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    studentId = `S${randomNum}`;
    exists = await User.findOne({ studentId });
  }

  return studentId;
};

// REGISTER CONTROLLER
export const register = async (req, res) => {
  try {
    const { name, email, password, branch } = req.body;

    // 1. validation
    if (!name || !email || !password || !branch) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. check email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. generate studentId
    const studentId = await generateStudentId();

    // 5. save user
    const user = await User.create({
      studentId,
      name,
      email,
      password: hashedPassword,
      branch
    });

    // 6. response
    res.status(201).json({
      message: "Registration successful",
      studentId: user.studentId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // 1. validation
    if (!studentId || !password) {
      return res.status(400).json({ message: "Student ID and password required" });
    }

    // 2. find user
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(400).json({ message: "Invalid student ID or password" });
    }

    // 3. compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid student ID or password" });
    }

    // 4. generate JWT token
    const token = jwt.sign(
      { userId: user._id },        // payload
      process.env.JWT_SECRET,      // secret key
      { expiresIn: "1d" }          // token expiry
    );

    // 5. response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        studentId: user.studentId,
        name: user.name,
        email: user.email,
        branch: user.branch
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
