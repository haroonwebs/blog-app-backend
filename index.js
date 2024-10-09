import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { dbconnection } from "./dbconnection.js";
import userRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commtRoutes from "./routes/commtRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
dbconnection();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/uploads", express.static(path.join(__dirname, "Storage")));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comments", commtRoutes);

//heroku deploy code 
// if(process.env.NODE_ENV == "production"){
//   app.use(express.static("frontend/dist"))
// }

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
