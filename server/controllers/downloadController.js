import path from 'path'

const downloadfile = async(req,res)=>{
    
    try {
        const filepath = path.resolve(req.file.path);
        res.download(filepath,req.file.originalname,(err)=>{
            if(err){
                console.log("Download error",err);
                return res.status(500).json({ message: "Failed to download file" });
            }
        });
    } catch (error) {
        return res.status(404).json("server error");
    }
}

export default downloadfile; 