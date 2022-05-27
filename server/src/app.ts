import express from 'express';
import {Client} from "pg";
import { createConnection } from 'typeorm';
import user from './routes/user'
import product from './routes/product'
import seller from './routes/seller'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import { searchProduct } from './controllers/product';
import multer from "multer";
const app = express();
const port = 5000;
const upload = multer();
app.use(express.json());
app.use(cookieParser());
dotenv.config({path:process.cwd()+'/.env'}) 
app.use(bodyParser.urlencoded({ extended: false })); 
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


app.listen(port,async () => {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "postgres",
    entities: [
      __dirname + '/entity/*.ts', 
    ],
    synchronize: true
  }).catch(err=>{
    console.log("Error : ",err); //____________________
    
  })
  return console.log(`Express is listening at http://localhost:${port}`);
});
app.use('/user',user)
app.use('/product',product)
app.use('/seller',seller)
// app.get('/search',searchProduct.validator,searchProduct.controller);