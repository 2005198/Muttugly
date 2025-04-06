import express from 'express';
import path from 'node:path';
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

let userdetail=JSON.parse(fs.readFileSync('../userfile/userDetail.json','utf-8'));

let cart=JSON.parse(fs.readFileSync('../userfile/cart.json','utf-8',(err)=>{console.err(err)}));




app.post('/user',writeUser);
app.post('/checkuser',checkuser)
app.post('/post', authorzie, (req, res) => {
    const { cart_id, cart_name, cart_price, cart_qty } = req.body;
    const userEmail = req.UserEmail;
    console.log(userEmail)
  
    const user = userdetail.find(u => u.Email === userEmail);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const cartItem = user.cart.find(item => item.id === cart_id);
  
    if (cartItem) {
      cartItem.qty += 1;
      fs.writeFile(
        path.join( '../userfile/userDetail.json'),
        JSON.stringify(userdetail, null, 2),
        'utf-8',
        err => {
          if (err) {
            console.error('File write error:', err);
            return res.status(500).json({ message: 'Failed to save cart item' });
          }
            
        }
        
      );
      return res.status(200).json({ message: 'Cart item updated successfully' });
      
    }
  
    user.cart.push({
      id: cart_id,
      name: cart_name,
      price: cart_price,
      qty: cart_qty
    });
  
    fs.writeFile(
      path.join( '../userfile/userDetail.json'),
      JSON.stringify(userdetail, null, 2),
      'utf-8',
      err => {
        if (err) {
          console.error('File write error:', err);
          return res.status(500).json({ message: 'Failed to save cart item' });
        }
        res.status(200).json({ message: 'Cart item saved successfully' });
      }
    );
  });




app.listen(PORT,(err)=>{
    if(err){console.error(err)}
    else{
    console.log(`listening at ${PORT}`)
    }
})
