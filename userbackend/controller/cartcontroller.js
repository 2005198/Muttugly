import cookieParser from 'cookie-parser';
import express from 'express';
import fs from "node:fs"
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app=express();
app.use(bodyParser.json());

//middleware to check login and send token
export async function checklogin(req,res,next){
    try{
        const cookie=req.cookies.authorization;
        if(!cookie){
          return  res.status(400).json("User not Found")
        }
        const token=jwt.decode(cookie);
     //   console.log(token)
        const email=token['UserEmail'];
        req.UserEmail=email;
        console.log(req.UserEmail)
        if(email){
            next();
        
        }
        else{
            res.status(402).json({message:"login first!!"})
        }
        
    }
    catch{
        res.status(400).json({message:"error while checking user"})
    }

}

//sending cart details as response 
export  function getitem(req,res){
    const email=req.UserEmail;
    const file= JSON.parse(fs.readFileSync("../userfile/userDetail.json","utf-8"));
    const user=file.find(u=>u.Email===email);
    const cart=user.cart;
    if(!cart){
      return res.status(402).json({message:"cart not found"})
    }
    console.log(user.cart);
   return res.status(200).json({cart})


}


//taking patch req and updating cart 
export async function updatecart(req,res){
    const file= await JSON.parse(fs.readFileSync("../userfile/userDetail.json","utf-8"));
   // console.log(file)
  //  console.log(req.body);
    const {qty,name}= await req.body;
    const email=req.UserEmail; // got this from middleware checklogin
  //  console.log(email,qty,name)
  const user=file.find(u=>u.Email===email);
  if(user){
    const item=user.cart.find(u=>u.name===name);
    if(item){
        item.qty=qty;
        fs.writeFileSync("../userfile/userDetail.json",JSON.stringify(file, null, 2),
                'utf-8');
       return res.status(200).json({message:"updated cart "})
    }
    else{
      return  res.status(400).json({message:"cart not found"})
    }
  }
  else{
    return res.status(400).json({
        message:"user not found"
    })
  }


    
}



///function to delete cart value for that user 
export async function deletecart(req,res){
  const file= await JSON.parse(fs.readFileSync("../userfile/userDetail.json","utf-8"));
  const {name}=await req.body;
  const trimname=name.trim()
  console.log(name,trimname)
  const userEmail=req.UserEmail;
  const isuser= file.findIndex(user=> user.Email===userEmail);
  if(isuser!==-1){
    const user = file[isuser]
    console.log(user)
  const cartIndex=user.cart.findIndex(cart=>cart.name===trimname);
  console.log(user[cartIndex])
  if(cartIndex!==-1){
    user.cart.splice(cartIndex,1);
  //  file[isuser]=user
    fs.writeFileSync("../userfile/userDetail.json",JSON.stringify(file, null, 2),
                'utf-8');
       return res.status(200).json({message:"updated cart "})

  }
else{return res.status(402).json({message:"cart item not found"})}}
  else{ return res.status(400).json({message:"user not found"})}

}