import express from 'express'
import verifytoken from '../middleware/verifytoken.js';
import verifyOwner from '../middleware/verifyOwner.js';

const sharefileRoutes = express.Router();

sharefileRoutes.patch('/sharefiles/:id',verifytoken,verifyOwner,(req,res)=>sharefiles(req,res));


export default sharefileRoutes