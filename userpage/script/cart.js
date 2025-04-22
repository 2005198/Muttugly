document.addEventListener("DOMContentLoaded",()=>{
  getitem()
})


//function to get items if logged in 
async function getitem(){
  const response = await fetch("/getitems",{
    method:'Get'
  })
  if(!response.ok){
    const div=document.getElementById("cart_items");
    div.innerHTML="";
    cartdiv=document.createElement('div')
    cartdiv.innerHTML=`<div>
      <h1 style="background-color:red;color:white;width:100%;display:flex;justify-content:center">USER LOGIN REQUIRED</h1>
          <a href="./userlogin.html" style="float:right;">LOGIN USER</a>
      
      </div>
  
      `
      div.appendChild(cartdiv)
      return ;
    }
  
  let cart=await response.json('cart');
  cart=cart['cart']
  const div=document.getElementById("cart_items");
  const divtotal=document.getElementById("cartTotal");
  div.innerHTML="";
  let total=0;
  cart.forEach(element => {
    total+=(parseInt(element.price.split("$")[1])*parseInt(element.qty))
    console.log(element.price)
    cartdiv=document.createElement('div')
    cartdiv.innerHTML=`<div class="container-father" style="display:inline;">
    <h1 id="name" class="name" style="display:inline;">${element.name}</h1>
    <h2 style="display:inline;margin-left:20px;color:red">QTY: ${element.qty}</h2><div style="margin-left:10px;display:inline" class="container"><button id="pls">+</button><input id="inp" type="text" value="${element.qty}"style="text-align:center;max-width:25px"><button id="min">-</button> <button onclick="func2(this)">UPDATE</button></div>
    <h2 style="display:inline;margin-left:20px;color:red"> PRICE : ${element.price}</h2>
    <div style="display:inline;"><button style="background-color:red" onclick="deleteItem(this)">DELETE X</button></div>
    </div>

    `
    div.appendChild(cartdiv)
  })
  console.log(total)
  divtotal.innerText="TOTAL: "+total;

}

document.addEventListener('click',function(event){
if(event.target.matches("#pls")){
  const cont=event.target.closest(".container")
  if(cont){
    let input=cont.querySelector("#inp")
    let value=parseInt(input.value)
    value+=1;
    input.value=value;
  }
}
else if(event.target.matches("#min")){
const cont=event.target.closest(".container");
if(cont){
  let input=cont.querySelector("#inp")
  let value=parseInt(input.value);
  if(value>0){
    value-=1;
  }
  input.value=value;
}
}
})



//update function for cart if logged in 
function func2(elem){
const container=elem.closest(".container");
const inputvalue=container.querySelector("#inp");
const container_father=elem.closest(".container-father")
const name=container_father.querySelector("h1#name")
console.log(name)
console.log(inputvalue.value)
fetch("/cartupdate",{
  method:"PATCH",
  headers:{
    'Content-Type':"application/json"
  },
  body:JSON.stringify({
    qty:inputvalue.value,
    name:name.textContent,

  })
})
.then(response=>{
  if(response.status==200){
  alert("updated")
getitem()}})


}

//function to delete item
function deleteItem(elem){
const container_father=elem.closest(".container-father")
const name=container_father.querySelector("h1#name")
fetch("/deleteItem",{
  method:"DELETE",
  headers:{"Content-type":"application/json"},
  body:JSON.stringify({
    name:name.textContent
  }).then(response=>{
    if(response.status(200)){
      getitem();
    }
  })
})

}

