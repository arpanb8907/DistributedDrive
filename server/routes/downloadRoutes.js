import express from 'express'
import verifytoken from '../middleware/verifytoken';
import verifyOwner from '../middleware/verifyOwner';
import downloadfile from '../controllers/downloadController.js';

const downloadRouter = express.Router();

downloadRouter.get('/download/:id',verifytoken,verifyOwner,(req,res)=>downloadfile(req,res));

export default downloadRouter;

