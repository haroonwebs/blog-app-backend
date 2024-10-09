import express from "express";
import { upload } from "../middlewares/fileUpload.js";
import {
  deletePost,
  getAllPosts,
  uploadPost,
} from "../controllers/postController.js";
import { isTeacher } from "../middlewares/veryfyToken.js";

const router = express.Router();

router.post("/upload" , isTeacher, upload.single("file"), uploadPost);
router.get("/allposts", getAllPosts);
router.delete("/delete/:id", isTeacher, deletePost);

export default router;
