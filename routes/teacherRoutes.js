import express from 'express'
import { isTeacher} from '../middlewares/veryfyToken.js'
import { deleteUser, getAllusers } from '../controllers/teacherControllers.js'


const router = express.Router()

router.get('/allusers', isTeacher, getAllusers )
router.delete("/delete/:id", isTeacher, deleteUser);
export default router;