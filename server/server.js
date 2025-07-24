import express from "express"
import router from "./routes/authRoutes.js"; 
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import uploadrouter from "./routes/uploadRoutes.js";
import downloadRouter from "./routes/downloadRoutes.js";
import deleteRouter from "./routes/deleteRoutes.js";
import getfilesRouter from "./routes/getfilesRoutes.js";
import sharefileRoutes from "./routes/sharefileRoutes.js";
import patchRouter from "./routes/patchRoutes.js";
import togglestarRoutes from "./routes/togglestarRoutes.js";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors({
  origin: ["http://localhost:5173","https://distributed-drive.vercel.app","http://d-drive-frontend.s3-website.ap-south-1.amazonaws.com"],
  credentials: true,
}));

app.use(express.json());
app.use('/api', router);
app.use('/api',uploadrouter)
app.use('/api',downloadRouter)
app.use('/api',deleteRouter)
app.use('/api',getfilesRouter)
app.use('/api',sharefileRoutes)
app.use('/api',patchRouter)
app.use('/api',togglestarRoutes)

//it will make uploads/ folder accessible via /uploads route
app.use('/uploads',express.static('uploads'));


app.get('/',(req,res)=>{

    console.log("Response from NodeJs Server ...")
});

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MongoDB_URL, {
     useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
})
.catch((error) => {
  console.error("❌ MongoDB connection error:", error);
});


mongoose.connection.on("connected", () => {
  console.log("MongoDB connected ✅");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error ❌", err);
});
