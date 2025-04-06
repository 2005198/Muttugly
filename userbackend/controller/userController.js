import express from 'express'
import * as fs from 'node:fs'
import jwt from 'jsonwebtoken';
import { skip } from 'node:test';
const SECRET="kadkfasdnjsdfsabfsMUKKARAM@69LOVER"

let userdetail=JSON.parse(fs.readFileSync('../userfile/userDetail.json','utf-8',(err)=>{
    console.log(err);
}));


export function writeUser(req,res){
let userdetail=JSON.parse(fs.readFileSync('../userfile/userDetail.json','utf-8',(err)=>{
        console.log(err);
    }));
    console.log(req.body);
    const {Email,password}=req.body;
    if(!Email || !password){
        res.status(402).json({
            status:402,
            body:{
                "content":"error with email or password"
            }
        })

    }
    else{
        userdetail.push({Email,password});
        fs.writeFile('../userfile/userDetail.json',JSON.stringify(userdetail,null,4),(err)=>{
            console.error(err);
        })
        res.status(200).json({
            status:200,
            message:"user created successfully",
            user:{Email,password},
            cart:[]
        })
    }
    
}



/// checking user and creating token ....
export function checkuser(req,res,next){
    const {Email,password}=req.body;
    for (const element of userdetail){
        if(element.Email===Email){
            const token=jwt.sign({UserEmail:element.Email},SECRET,{expiresIn:"2h"});
            res.cookie("authorization",token,{
                maxAge:"360000000" 
            })
         return  res.status(200).json({message:"login successful",body:{token}})
        
        }
    
    }
    res.status(400).json({message:"no user found !!"});


}

//middleware to authorize token 

export function authorzie(req,res,next){
       const token =req.cookies.authorization;
       console.log(token);
       if(token){
        try{
        const decode=jwt.verify(token,SECRET);
        console.log(decode.UserEmail);
        req.UserEmail=decode.UserEmail; //sending to next middleware 
        next();
        }
        catch(err){
            console.error(err)
        }
       }
       else{
        res.status(402).json({
            message:"error token not found login again !!"
        })
       }
}