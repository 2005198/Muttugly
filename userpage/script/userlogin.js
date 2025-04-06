function Func1(){
    event.preventDefault();
    const emailId=document.getElementById("emailId").value;
    const password=document.getElementById("password").value;
    console.log(emailId,password)
    fetch("/checkuser",{
        method:'Post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({Email:emailId,password})
    }
)
}