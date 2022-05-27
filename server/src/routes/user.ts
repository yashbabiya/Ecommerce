import { Router } from "express";
import { getRepository } from "typeorm";
import { addToCart, login, placeOrder, removeCartProduct, signup, updateQantity } from "../controllers/user";
import { User } from "../entity/User";
import autherizeUser from "../helpers/autherizeUser";

const router =  Router();

router.post('/signup',signup.validator,signup.controller)
router.post('/login',login.validator,login.controller)
router.post('/addToCart',autherizeUser,addToCart.validator ,addToCart.controller)
router.post('/updateQty',autherizeUser,updateQantity.validator,updateQantity.controller)
router.delete('/removeFromCart',autherizeUser,removeCartProduct.validator,removeCartProduct.controller)
router.post('/placeOrder',autherizeUser,placeOrder.validator,placeOrder.controller)
export default router;