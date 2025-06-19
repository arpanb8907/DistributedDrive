import { response } from "express";


const renamefile = async(req,res)=>{
    const {newfileName} = req.body
    try {
        const file = req.file;
       
        if(!file){
            return res.status(404).json({message:"File not found"})
            
        } 

        if(newfileName==="" || newfileName.trim()==="") return res.status(403).json({message:"New name can not be empty"})
        if(newfileName === file.originalname) return res.status(401).json({message:"New name must be different from previous one"});
        
        const parts = file.originalname.split('.');
        const extension = parts.pop();

        

        file.originalname = newfileName+"."+extension

        await file.save();

        return res.status(200).json({file, message:"file renamed successfully"})
    } catch (error) {
        return res.status(500).json({message : "Server error"});
    }

}

export default renamefile