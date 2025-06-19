import express from 'express'
import verifytoken from '../middleware/verifytoken.js';
import verifyOwner from '../middleware/verifyOwner.js';
import renamefile from '../controllers/renamefile.js';

const patchRouter = express.Router();

patchRouter.patch('/patch/rename/:id',verifytoken,verifyOwner,(req,res)=>renamefile(req,res));

export default patchRouter