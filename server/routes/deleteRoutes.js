import express from 'express'
import verifytoken from '../middleware/verifytoken';
import verifyOwner from '../middleware/verifyOwner';
import deletefile from '../controllers/deletefile.js';

const deleteRouter = express.Router();

deleteRouter.delete('files/:id',verifytoken,verifyOwner,(req,res)=>deletefile(req,res));

export default deleteRouter;