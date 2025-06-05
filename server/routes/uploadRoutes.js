import express from 'express'
import verifytoken from '../middleware/verifytoken.js';
import uploadfile from '../controllers/uploadfile.js';
import upload from '../middleware/multerConfig.js';

const uploadrouter = express.Router();

// here there are two middleware 
    // 1. verifytoken which will verify whether a logged in user is trying to access this route or not
    
    // 2. upload.single('file') this middleware is doing multiple important steps ---> naviagte to Readme to know in details 

    
uploadrouter.post('/upload',verifytoken,upload.single('file'),(req,res)=>uploadfile(req,res));

export default uploadrouter