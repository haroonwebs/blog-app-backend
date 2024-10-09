import express from 'express'
import { Login, Logout, registerUser } from '../controllers/authcontroller.js';

const router = express.Router();


router.post("/register", registerUser)
router.post("/login", Login);
router.post("/logout", Logout);

export default router;