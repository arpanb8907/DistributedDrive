import express from "express";
import verifytoken from "../middleware/verifytoken";
import verifyOwner from "../middleware/verifyOwner";

const togglestarRoutes = express.Router();

togglestarRoutes.patch('/files/:id/star',verifytoken,verifyOwner,(req,res)=>togglestar(req,res));

export default togglestarRoutes;
