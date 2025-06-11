import express from "express";
import verifytoken from "../middleware/verifytoken.js";
import verifyOwner from "../middleware/verifyOwner.js";

const togglestarRoutes = express.Router();

togglestarRoutes.patch('/files/:id/star',verifytoken,verifyOwner,(req,res)=>togglestar(req,res));

export default togglestarRoutes;
