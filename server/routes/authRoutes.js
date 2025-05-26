import express from "express"
import { registerUser,loginUser } from "../controllers/authController.js";
import verifytoken from "../middleware/verifytoken.js";

const router = express.Router();

router.post('/register',(req,res)=>registerUser(req,res));
router.post('/login', (req,res)=>loginUser(req,res));
router.post('/upload',verifytoken,(req,res)=>uploadfile(req,res));


export default router;