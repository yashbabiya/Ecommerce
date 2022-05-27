import { NextFunction, Request, Response } from "express";
import { getRepository, In } from "typeorm";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import verifyToken from "../helpers/verifyToken";
import { CartItem } from "../entity/CartItem";
import { getDataFromToken } from "../helpers/autherizeUser";
import { Order } from "../entity/Order";

export const signup = {
  validator: (req: Request, res, next: NextFunction) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).send("Enter all Details");
    }
    next();
  },
  controller: async (req: Request, res) => {
    try {
      const userRepo = getRepository(User);

      await userRepo
        .findOne({
          where: [
            {
              name: req.body.name,
            },
            {
              email: req.body.email,
            },
          ],
        })
        .then(() => {
          return res
            .status(400)
            .send("user already exists with this username or email");
        });

      const user = userRepo.create();

      user.name = req.body.name;
      user.password = req.body.password;
      user.email = req.body.email;
      user.address = user.address ? user.address : "";

      await userRepo.save(user).catch((err) => {
        return res.status(500).send("User is not saved");
      });

      console.log(user);
      return res.send(user);
    } catch (e) {
      return res.status(500).send(e);
    }
  },
};

export const login = {
  validator: (req: Request, res, next: NextFunction) => {
    if (!req.body.name || !req.body.password) {
      return res.status(400).send("Enter all Details");
    }
    next();
  },
  controller: async (req: Request, res) => {
    try {
      const userRepo = getRepository(User);
      const user: any = await userRepo
        .findOne({
          where: { name: req.body.name, password: req.body.password },
        })
        .catch((err) => {
          console.log("err_________");
        });

      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ id: user._id }, jwtSecretKey);
      user && res.cookie("token", token, { httpOnly: true });
      return user ? res.send(token) : res.status(400).send("no not you");
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};

export const addToCart = {
  validator: (req, res, next: NextFunction) => {
    if (!req.body.item || !req.cookies.token) {
      return res.status(400).send("Enter all details");
    }
    next();
  },
  controller: async (req, res: Response) => {
    const { item } = req.body;
    const { token } = req.cookies;
    try {
      const user = verifyToken(token);

      if (!(user && user.id)) {
        return res.status(400).send("Not a user");
      }

      // const product = await Product.findOne(item);
      const userData = await User.findOne(user.id);

      const product = await Product.findOne({
        where:{_id:item},
        relations:['seller']
      });
      const seller = product.seller
      

      if (!product || !userData) {
        res.status(400).send("Something is not well");
      }
      console.log('ok',userData);
      

      const cartItem = CartItem.create({
        product: product,
        user: userData,
        quantity: 1,
        seller:seller
        
      });

      const response = await CartItem.save(cartItem);
      // const response = "";
      // console.log(response);
      
      return res.send(response);
    } catch (e) {
      return res.status(500).send("Internal Error");
    }
  },
};

export const updateQantity = {
  validator: (req, res, next: NextFunction) => {
    if (!req.body.count || !req.body.id || !req.cookies.token) {
      return res.status(400).send("Pass all details");
    }
    next();
  },
  controller: async (req, res) => {
    const { id, count } = req.body;

    const userTokenData = await getDataFromToken(req.cookies.token);

    var cartItem = await CartItem.findOne({
      where: {
        _id: id,
        user_id: userTokenData.id,
      },
    });

    if (!cartItem) return res.status(400).send("No cart item");

    cartItem.quantity = count;

    const response = await CartItem.save(cartItem);

    return response ? res.send(response) : res.status(500).send("not updated");
  },
};

export const removeCartProduct = {
  validator: (req:Request,res:Response) => {
    if(!req.query.id || !req.cookies.token)
    return res.status(400).send("Pass all details")
  },
  controller: async(req:Request,res:Response)=> {
    const {id} : any = req.query;
    
    const x = await CartItem.delete(id)
  }
};

export const placeOrder = {
  validator:(req:Request,res:Response,next:NextFunction)=>{
    if(!req.body.items)
    return res.status(400).send("No item passed")

    next();
  },
  controller:async(req:Request,res:Response)=>{
    const cartItem:any = await CartItem.find({
      where:{
      _id : In( req.body.items)
      },  
      relations:['product','seller','user']
    });

    cartItem.map(item =>{
      delete item._id;
    })

    const data = await Order.save(cartItem);

    res.send(data);
  }
}
