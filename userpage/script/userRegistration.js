//create user 

function Func1(){
    event.preventDefault();
let Email=document.getElementById("emailId").value;
let password=document.getElementById("password").value;
let confirmPassword=document.getElementById("confirmPassword").value;
if(confirmPassword===password && Email!==''){
fetch('/user',{
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    
    },
    body:JSON.stringify({Email,password})


})
.then(()=>window.location.href="/userlogin.html")
.catch(err=>{console.log(err)})
}
else{
alert("password dont match !!! || EMAIL NOT ENTERED ")
}
}