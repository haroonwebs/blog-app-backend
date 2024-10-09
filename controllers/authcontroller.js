import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { sendVerifyMail } from "../MailFunction/sendMail.js";

config();

// register user to the platform

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username) {
      return res.status(403).json({
        success: false,
        message: "Please enter Username",
      });
    }

    if (!email) {
      return res.status(403).json({
        success: false,
        message: "Please enter email",
      });
    }

    if (!password) {
      return res.status(403).json({
        success: false,
        message: "Please enter Passowrd",
      });
    }

    if (!role) {
      return res.status(403).json({
        success: false,
        message: "Please define your role",
      });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(403).json({
        success: false,
        message: "user has already exist",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashpassword,
      role,
    });
    // send email to new register user

    sendVerifyMail(newUser.username, newUser.email);

    const token = jwt.sign({ userid: newUser._id }, process.env.JWT_SECRETE);
    res.cookie("token", token, {
      httpOnly: true,
      SameSite: "None",
      secure: false,
      maxAge: 360000,
    });

    return res.status(200).json({
      success: true,
      message: "User register successfully",
      newUser,
      token,
    });
  } catch (error) {
    res.status(405).json({
      success: false,
      message: "internal server error",
    });
  }
};

//  login controller for user login

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(403).json({
        success: false,
        message: "User with this email is not exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, User.password);

    if (!checkPassword) {
      return res.status(403).json({
        success: false,
        message: "worng password",
      });
    }

    // generating jsonweb token for authentication and sending this via cookie

    const token = jwt.sign({ userid: User._id }, process.env.JWT_SECRETE);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 3600000,
    });
    res.status(200).json({
      success: true,
      message: "User login successfully",
      User,
      token,
    });
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "internal server error " });
  }
};

// logout controller

export const Logout = async (req, res) => {
  try {
    await res.clearCookie("token",{
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/"
    });
    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    return res.status(403).json({ message: "internal server error " });
  }
};
