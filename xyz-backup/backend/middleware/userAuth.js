import jwt from "jsonwebtoken";

const userAuth = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({success:false,message:"Not Authorised. Login Again!"});
    }
    try {
        
        const tokenDecoder=jwt.verify(token,process.env.JWT_SECRET);

        console.log(tokenDecoder);
        console.log(tokenDecoder.id);


        if(tokenDecoder.id){
            req.userId=tokenDecoder.id;
        }else{
            return res.json({success:false,message:"Not Authorised. Login Again!"});
        }

        next();

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export default userAuth;