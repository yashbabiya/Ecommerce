import { NextFunction, Request, Response } from "express";
import { Seller } from "../entity/Seller";
import { User } from "../entity/User";
import verifyToken from "./verifyToken";

export const getDataFromToken = async(token:string) =>{
    const userData = verifyToken(token);

    if(!(userData && userData.id)){
        return false;
    }
    
    const data = await Seller.findOne(userData.id);
    return data || null;
}
const autherizeSeller = async(req:Request,res:Response,next:NextFunction) =>{
    const token = req.cookies.token;
    const userData = verifyToken(token);

    if(!(userData && userData.id)){
        return  res.status(400).send("Login first") ;
    }
    
    const data = await Seller.findOne(userData.id);
    data ? next() : res.status(400).send("Login first") 
}

export default autherizeSeller;