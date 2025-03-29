function Func1(){
let Email=document.getElementById("emailId").value;
let password=document.getElementById("password").value;
fetch('/user',{
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    
    },
    body:JSON.stringify({Email,password})


})
.then(data=>{console.log(data)})
.catch(err=>{console.log(err)})
}