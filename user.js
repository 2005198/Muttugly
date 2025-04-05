import express from 'express';
import {writeUser,checkuser,authorzie} from "./controller/userController.js"
import { error } from 'node:console';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import * as fs from 'node:fs';

const app =express();
app.use(bodyParser.json());
const PORT=3000;
app.use(cookieParser());

app.use(express.static('../userpage'))

let userdetail=JSON.parse(fs.readFileSync('../userfile/userDetail.json','utf-8',(err)=>{
    console.log(err);
}));
let cart=JSON.parse(fs.readFileSync('../userfile/cart.json','utf-8',(err)=>{console.err(err)}));




app.post('/user',writeUser);
app.post('/checkuser',checkuser)
app.post('/post',authorzie,(req,res)=>{
    const {cart_id,cart_name,cart_price,cart_qty} =req.body;
    let cartone=cart.find(c=>c.id===cart_id);
    console.log("cart: ",cart_id,cart_name,cart_price,cart_qty)
    console.log("cartone:",cartone)
    if(cartone){
        cartone.qty+=1;
    }
    else{
        cart.push({id:cart_id,name:cart_name,price:cart_price,qty:cart_qty})
    }
    fs.writeFile('../userfile/cart.json', JSON.stringify(cart, null, 2), 'utf-8',err=>{if(err){console.error(err)}
else{   res.status(200).json({
    message:"saved cart Item!!"
})}});
 
})




app.listen(PORT,(err)=>{
    if(err){console.error(err)}
    else{
    console.log(`listening at ${PORT}`)
    }
})


