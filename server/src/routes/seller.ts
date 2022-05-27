import { Router } from "express";
import { completeOrder, deleteProduct, getMyOrders, getMyProducts, login } from "../controllers/seller";
import autherizeSeller from "../helpers/autherizeSeller";

const router =  Router();

router.post('/login',login.validator,login.controller)
router.get('/getMyProducts',getMyProducts.controller);
router.delete('/deleteProducts/:id',autherizeSeller,deleteProduct.controller,deleteProduct.validator)
router.get('/getMyOrders',autherizeSeller,getMyOrders.controller)
router.delete('/order/complete',autherizeSeller,completeOrder.validator,completeOrder.controller)

export default router;