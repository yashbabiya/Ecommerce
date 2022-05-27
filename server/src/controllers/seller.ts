import { Seller } from "../entity/Seller";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { getDataFromToken } from "../helpers/autherizeSeller";
import { createQueryBuilder } from "typeorm";
import { Product } from "../entity/Product";
import { Order } from "../entity/Order";

export const login = {
  validator: (req, res, next: NextFunction) => {
    if (!req.body.name || !req.body.password)
      return res.status(400).send("Pass details");
    next();
  },
  controller: async (req, res) => {
    try {
      // return res.send("ok")
      const user: any = await Seller.findOne({
        where: { name: req.body.name, password: req.body.password },
      }).catch((err) => {
        console.log("err_________",err);
      });

      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ id: user._id }, jwtSecretKey);
      user && res.cookie("token", token, { httpOnly: true });
      return user ? res.send(token) : res.status(400).send("no not you");
    } catch (e) {
      return res.status(500).send(e);
    }
  },
};

export const getMyProducts = {
  controller: async (req, res) => {
    const seller = await getDataFromToken(req.cookies.token);

    if (!seller) return res.status(400).send("Not a Valid seller");

    try {
      //   const sellers = await Seller.find({ relations: ["products"] });

      const sellers = await Seller.createQueryBuilder()
        .leftJoinAndSelect("Seller.products", "products")
        .addSelect(["products"])
        .where("Seller.name = :name", { name: seller.name })
        .getOne();
      return res.send(sellers.products);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  },
};

export const deleteProduct = {
  validator: (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return res.status(400).send("Pass id in param");
    next();
  },
  controller: async (req: Request, res: Response) => {
    const seller = await getDataFromToken(req.cookies.token);

    if (!seller) return res.status(400).send("Not a Valid seller");

    try {
      const product = await Product.findOne({
        where: { seller: seller, _id: req.params.id },
      });

      await Product.delete(product);
      return res.send("Done");
    } catch (e) {
      console.log(e);
      return res.status(400).send("okok");
    }
  },
};

export const getMyOrders = {
  
  controller:async(req:Request,res:Response)=>{
    try{
      const seller = await getDataFromToken(req.cookies.token);
      const orders = await Order.createQueryBuilder()
        .leftJoinAndSelect("Order.product", "product")
        .addSelect(["product"])
        .where("Order.seller._id = :id", { id : seller._id })
        .getOne();

      return res.send(orders);
    }
    catch(e){
      return res.status(500);
    }
  }
}

export const completeOrder = {
  
      validator:(req,res,next)=>{
          if(!req.query.orderId)
          return res.status(400).send("Enter orderId")

          next()
      },
      controller:async(req,res)=>{

        try{

          const seller = await getDataFromToken(req.cookies.token);
          const order = await Order.findOne(req.query.orderId);

          if(!order || !seller)
          return res.status(400).send()

          const orderTobeDeleted = await 
          Order
          .createQueryBuilder()
          .leftJoinAndSelect("Order.seller","seller")
          .addSelect("seller")
          .where("Order.seller._id = :id",{id:seller._id})
          .getOne();
          await Order.delete(orderTobeDeleted._id)
          return res.send(orderTobeDeleted)
        }
        catch(e){
          return res.status(500).send();
        }

        
      }

  
}