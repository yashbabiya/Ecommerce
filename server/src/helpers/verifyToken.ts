import jwt from 'jsonwebtoken' 
 
const verifyToken = (token) =>{
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY)
        return payload;

    }
    catch(e){
        return null;
    }
 } 

export default verifyToken;