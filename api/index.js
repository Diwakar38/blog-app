import Express from "express";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";
// import db from "./db.js"
const app = Express()

app.use(Express.json())
app.use(cookieParser());
app.use(cors({
    // origin: 'https://blogapp-frontend-7zxm.onrender.com',
    origin: 'http://localhost:3000',
    credentials: true
}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use("/api/posts/", postRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);

app.listen(8800, () => {
    console.log("Listening to 8800");
})
