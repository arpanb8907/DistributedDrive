import express from "express"
import router from "./routes/authRoutes.js"; 
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/api', router);
app.use(cors());


app.get('/',(req,res)=>{

    console.log("Response from NodeJs Server ...")
});

app.listen(PORT,()=>{
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
