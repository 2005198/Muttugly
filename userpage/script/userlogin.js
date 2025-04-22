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
).then(response=>{
    if(response.status==200){window.location.href="/index.html"}
    else{
        alert("NOT REGISTERED USER")
        window.location.href="/userRegistration.html";
    }
})
.catch(err=>console.log(err))
}