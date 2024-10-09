import jwt from 'jsonwebtoken'
import { UserModel } from '../models/UserModel.js';

export const isTeacher = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"You are not logedin with server please login first"})
        }
// decode and verify token 
        const tokendecoded = jwt.verify(token, process.env.JWT_SECRETE);

// getting user against decoded token         
        const user = await UserModel.findById(tokendecoded.userid)

        if(!user){
            return res.status(500).json({message: " User not found "})
        }

        if(user.role !== "teacher"){
            return res.status(403).json({message: "Only teacher is authorized for this service"})
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json({message: "internal server error"})
    }
};



export const isStudent = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Only user with role Student is authorized for this service",
      });
    }

    // decode and verify token
    const tokendecoded = jwt.verify(token, process.env.JWT_SECRETE);

    // getting user against decoded token
    const user = await UserModel.findById(tokendecoded.userid);

    if (!user) {
      return res.status(500).json({ message: " User not found " });
    }

    if (user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only student is authorized for this service" });
    }

    req.user = user;
    next();
    
  } catch (error) {
    return res.status(400).json({ message: "internal server error" });
  }
};