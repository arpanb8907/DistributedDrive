import express from "express"
import { registerUser,loginUser } from "../controllers/authController.js";


const router = express.Router();

router.post('/register',(req,res)=>registerUser(req,res));
router.post('/login', (req,res)=>loginUser(req,res));



export default router;