import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";
import { Seller } from "../entity/Seller";
import { getDataFromToken } from "../helpers/autherizeUser";
import verifyToken from "../helpers/verifyToken";

export const createProduct = {
  validator: (req, res,next) => {
    if (!req.body.name || !req.body.price || !req.body.description)
      return res.status(400).send(req.body);

    next()
  },
  controller: async (req: Request, res: Response,fname) => {
    const {name,price,description} = req.body;
    const token = req.cookies.token;
    const userData = verifyToken(token);

    if (!(userData && userData.id)) {
      return res.status(400).send("not valid user");
    }

    const seller = await Seller.findOne(userData.id);

    if(!seller)
    return res.status(400).send("seller doesnt exists");

    const product = Product.create({
      name,
      price,
      description,
      seller,
      image:fname
    });
    await Product.save(product);
    console.log(req.body);
    
    return res.send(req.body);
  },
};

export const allProducts = {
  validator:(req:Request, res,next:NextFunction)=>{
    if(!req.query.page){
      return res.status(400).send("Pass Page number");

    }
    next();
  }, 
  controller: async (req, res) => {
    let filt = req.query.filt; 
    const prodRepo = getRepository(Product);
    const page = req.query.page;
    const item = req.query.items || 10;
    const data:any = await prodRepo.find({order:{_id: "DESC"}}).catch((err) => {
      res.status(500);
    });
    
    let r=null;
        if(page > data.length/item + 1)
        {
            return res.send([])
        }
        if(page)
        {
            const ei = page*item;
            const si = (page-1)*item;
            
            r=data?.slice(si,ei);
            console.log(r);
        }
        else{
            r=data
        }


    res.send(r);
  },
};
export const getProduct = {
  validator:(req:Request,res:Response,next:NextFunction)=>{
    if(!req.params.id){
      return res.status(400).send("Pass id");
    }
    next();
  },
  controller:async(req:Request,res:Response)=>{
    const productId = req.params.id;
    try{

      const product = await Product.findOne( productId );
      return product ? res.send(product) : res.send({});
    }
    catch(e){

      console.log(e);
      return res.status(400);
      
    }
  }
}

export const searchProduct ={
  validator:(req:Request,res:Response,next:NextFunction)=>{
    if(!req.query.keyword){
      return res.status(400).send("Enter Keywords to search");
    }
    next();
  },
  controller:async(req:Request,res:Response)=>{
    let word = req.query.keyword;
    let filt = req.query.filt; 
    const product = await Product
                          .createQueryBuilder("product")
                          .where("product.name like :name",{name :`%${word}%`})
                          .orderBy(filt!=null && 'product.price', filt=='ASC'?'ASC':'DESC')
                          .getMany();

    return res.send(product);
  }
}
export const updateProduct = {
  validator:(req:Request,res:Response,next:NextFunction)=>{
    if(!req.params.id )
    {
       return res.status(400).send("pass product id")
    }
    next();
  },
  controller:async (req,res)=>{
    const productId = req.params.id;
    const tokenData = verifyToken(req.cookies.token);
    
    if(!tokenData || !tokenData.id)
    {
      return res.status(400).send("not a valid token")
    }

    const product = await Product.findOne({
      where:{
        _id:productId,
        seller:tokenData.id
      }
    });

    if(!product)
    return res.status(400).send("no products");

    // console.log(product);
    
    product.name = req.body.name || product.name ;
    product.description = req.body.description || product.description ;
    product.price = req.body.price || product.price ;

    await Product.save(product);
    
    return res.send(product);
  }
}
