import express from 'express'
import verifytoken from '../middleware/verifytoken';

const getfilesRouter = express.Router();

getfilesRouter.get('/getfiles',verifytoken,(req,res)=>getfiles(req,res));

export default getfilesRouter;