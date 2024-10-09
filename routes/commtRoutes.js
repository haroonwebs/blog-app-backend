import express from "express"
import { getAllcomments, postComments } from "../controllers/commtController.js";


const router = express.Router()

router.post("/newcomments", postComments);
router.get("/allcomments/:postId", getAllcomments);


export default router; 