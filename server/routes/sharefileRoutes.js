import express from 'express'
import verifytoken from '../middleware/verifytoken';
import verifyOwner from '../middleware/verifyOwner';

const sharefileRoutes = express.Router();

sharefileRoutes.patch('/sharefiles/:id',verifytoken,verifyOwner,(req,res)=>sharefiles(req,res));


export default sharefileRoutes