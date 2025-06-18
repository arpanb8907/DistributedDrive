import express from 'express'
import verifytoken from '../middleware/verifytoken.js';
import verifyOwner from '../middleware/verifyOwner.js';
import deletefile from '../controllers/deletefile.js';

const deleteRouter = express.Router();

deleteRouter.delete('/delete/files/:id',verifytoken,verifyOwner,(req,res)=>deletefile(req,res));

export default deleteRouter;