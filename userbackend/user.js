import express from 'express';
import { error } from 'node:console';
import bodyParser from 'body-parser';
import * as fs from 'node:fs';

const app =express();
app.use(bodyParser.json());
const PORT=3000;

app.use(express.static('../userpage'))

let userdetail=JSON.parse(fs.readFileSync('../userfile/userDetail.json','utf-8',(err)=>{
    console.log(err);
}));




app.post('/user',(req,res)=>{
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
            user:{Email,password}
        })
    }
    
})


app.listen(PORT,(err)=>{
    if(err){console.error(err)}
    else{
    console.log(`listening at ${PORT}`)
    }
})


