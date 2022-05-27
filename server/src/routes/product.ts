import { Request, Response, Router } from "express";
import {
  allProducts,
  createProduct,
  getProduct,
  searchProduct,
  updateProduct,
  // uploadController,
} from "../controllers/product";
import { placeOrder } from "../controllers/user";
import autherizeSeller from "../helpers/autherizeSeller";
import multer from "multer";
import bodyParser from "body-parser";


let fname;
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{

    cb(null,"./public/data/uploads/");
  }  
    ,
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    fname = `${file.fieldname}-${Date.now()}.${ext}`;
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });
const middle = multer();
const router = Router();

router.get("/all", allProducts.controller);
router.post(
  "/create",
  bodyParser.urlencoded({ extended: false }),
  autherizeSeller,
  upload.single("uploaded_file"),
  createProduct.validator,
  (req:Request,res:Response)=>{

    createProduct.controller(req,res,fname);
  }
);
// router.post(
//   "/upload",
//   upload.single("uploaded_file"),
//   uploadController
// );
router.get("/get/:id", getProduct.validator, getProduct.controller);

router.get("/search", searchProduct.validator, searchProduct.controller);

router.post(
  "/update/:id",
  autherizeSeller,
  updateProduct.validator,
  updateProduct.controller
);

export default router;
