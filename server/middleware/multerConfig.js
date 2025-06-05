import multer from "multer";


// define a storage engine which will tells where to store the file in server along with the name of the file which to be stored
const storage = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null,'uploads/')
    },

    filename : function(req,file,cb){

        cb(null,Date.now()+'-'+file.originalname);
    }
});

// create 
const upload = multer({storage});

export default upload;