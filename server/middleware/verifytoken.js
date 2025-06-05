import jwt from'jsonwebtoken'

const verifytoken = async(req,res,next)=>{
    
    const authHeader = req.headers.authorization;

    console.log("auth- header :" ,authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'Unauthorized access'});
    }

    // token found
    const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{

        if(err){
            return res.status(404).json({message: 'Invalid token'});
        }

        req.user = decoded
        next();
    });


}

export default verifytoken