async function Func1(){
    event.preventDefault();
    const emailId=document.getElementById("emailId").value;
    const password=document.getElementById("password").value;
    console.log(emailId,password)
    await fetch("/checkuser",{
        method:'Post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({Email:emailId,password})
    }
).then(window.location.href="/index.html")
.catch(err=>console.log(err))
}