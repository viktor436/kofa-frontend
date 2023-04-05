const commentContainer = document.getElementById('allComments');
document.getElementById('addComments').addEventListener('click', function () {
   addComment();
});

function visualizeComment(commentText) {
    let wrapDiv;
    const textBox = document.createElement('div');
    
    
    wrapDiv = document.createElement('div');
    wrapDiv.className = 'wrapper';
    wrapDiv.style.marginLeft = 0;
    document.getElementById('newComment').value = '';
    
    textBox.innerHTML = commentText;
    wrapDiv.append(textBox);
    commentContainer.appendChild(wrapDiv);
}
function getCommentsFromDB(){
    pName = document.getElementById('productName').innerHTML;
    var url = new URL("http://localhost:8080/comment/all");
    url.searchParams.append("productName", pName);
    fetch(url, { method : "GET",})
    .then(res => res.text()).then((txt) => {
      const data= JSON.parse(txt);
      for(let i = 0;i<=data.length;i++){
        visualizeComment(data[i]["comment"])
      }
    });
  }
window.addEventListener("load", getCommentsFromDB);
  
function addComment() {
    let commentText, wrapDiv, productName;
    const textBox = document.createElement('div');
    productName= document.getElementById('productName').innerHTML;
    
    wrapDiv = document.createElement('div');
    wrapDiv.className = 'wrapper';
    wrapDiv.style.marginLeft = 0;
    commentText = document.getElementById('newComment').value;
    document.getElementById('newComment').value = '';

    const commentReq = new XMLHttpRequest();
    var data = new FormData();
    data.append('comment', commentText);
    data.append('productName', productName);
    commentReq.open('POST',"http://localhost:8080/comment/new");
    commentReq.onload=function(){
        alert(commentReq.responseText);
    }
    commentReq.send(data);
    textBox.innerHTML = commentText;
    wrapDiv.append(textBox);
    commentContainer.appendChild(wrapDiv);
}
  
function reveal(){
    var x = document.getElementById('c1');
    if(x.style.display==="none"){
        x.style.display="flex";
    }else{
        x.style.display="none";
    }
    
}
function revealSubmittion(){
    var x = document.getElementById('s1');
    if(x.style.display==="none"){
        x.style.display="block";
    }else{
        x.style.display="none";
    }
    
}

let cart = document.getElementById("p1");
function addToCard(){
    let productName = "Kettle";
    let productPrice = "price";
    localStorage.setItem("name", productName)
    localStorage.setItem("price", productPrice);
    cart.innerHTML="productName:"+productName+" productPrice:"+productPrice;
}

function clearcontent(elementID) {
    document.getElementById(elementID).innerHTML = "";
var totalP = 0;
}

//document.getElementById("addb").onclick = addToCart;
function addToCart(name, price){
    
    var tag = document.createElement("p");
    var text = document.createTextNode(name+':'+'$'+price);
    tag.appendChild(text);
    var element = document.getElementById("cp");
    element.append(tag);
    let tprice=document.getElementById("TotalP")
    tprice.textContent='Total:$'+parseFloat(totalPrice());
}
function totalPrice(){
    var total= document.getElementById('cp').children;
    var totalPrice= 0.0;
    for (i = 1; i <= total.length - 1; i++) {
        let p = total[i].textContent.split('$');
        totalPrice+=parseFloat(p[1]);
    }
    return totalPrice;
}

function revealC(){
    var x = document.getElementById('cp');
    if(x.style.display==="none"){
        x.style.display="block";
    }else{
        x.style.display="none";
    }   
}

const orderBtn = document.getElementById("orderBtn");
let orderId=0;
const sendOrder = () => {
    const orderReq = new XMLHttpRequest();
    let clientName=document.getElementById("clientName").value;
    let clientAddress=document.getElementById("address").value;
    let telNum=document.getElementById("phoneNumber").value;
    let product = document.getElementById("productName").textContent;
    var data = new FormData();
    if(clientAddress===''||clientName===''||telNum==''){
        alert("One or more fields are not filed, fill them to proceed order!")
    }
    else{
        data.append('clientTelNumber', telNum);
        data.append('product', product);
        data.append('address', clientAddress);
        data.append('name', clientName);
        orderReq.open('POST',"http://localhost:8080/order/new");
        orderReq.onreadystatechange = function() {
            console.log(orderReq.readyState)
            if (orderReq.readyState == 2) {
                console.log("Header received");
            } else if (orderReq.readyState == 3) {
                console.log("loading");
            } else if (orderReq.readyState == 4) {
                console.log("Request Finished");
            }
        };
        orderReq.onload=function(){
            alert(orderReq.responseText);
        }
        orderReq.send(data);
    }
};
orderBtn.addEventListener("click", sendOrder);

function sendProduct() {
    const productReq = new XMLHttpRequest();
    let productName=document.getElementById("productName").value;
    let productPrice=parseFloat(document.getElementById("productPrice").value);
    let productDescription=document.getElementById("productDescription").value;
    let productLink = document.getElementById("productImage").value;
    var data = new FormData();
    if(productName===''||productPrice===''||productDescription==''){
        alert("One or more fields are not filed, fill them to proceed!")
    }
    else{
        data.append('imageLink', productLink);
        data.append('description', productDescription);
        data.append('price', productPrice);
        data.append('name', productName);
        productReq.open('POST',"http://localhost:8080/product/new");
        productReq.onreadystatechange = function() {
            console.log(productReq.readyState)
            if (productReq.readyState == 2) {
                console.log("Header received");
            } else if (productReq.readyState == 3) {
                console.log("loading");
            } else if (productReq.readyState == 4) {
                console.log("Request Finished");
            }
        };
        productReq.onload=function(){
            alert(productReq.responseText);
        }
        productReq.send(data);
    }
};

function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
  
  window.initMap = initMap;


function cartProducts(){
    var total= document.getElementById('cp').children;
    var productsString= "";
    for (i = 1; i <= total.length - 1; i++) {
        let p = total[i].textContent.split(':');
        if(i>1){
            productsString+=",";
        }
        productsString+=(p[0]);
    }
    return productsString;
}


function sendCartOrder(){
    const orderReq = new XMLHttpRequest();
    let clientName=document.getElementById("clientName").value;
    let clientAddress=document.getElementById("address").value;
    let telNum=document.getElementById("phoneNumber").value;
      
    let product = cartProducts();
    var data = new FormData();
    if(clientAddress===''||clientName===''||telNum==''){
        alert("One or more fields are not filed, fill them to proceed order!")
    }
    else{
        data.append('clientTelNumber', telNum);
        data.append('product', product);
        data.append('address', clientAddress);
        data.append('name', clientName);
        orderReq.open('POST',"http://localhost:8080/order/new");
        orderReq.onreadystatechange = function() {
            console.log(orderReq.readyState)
            if (orderReq.readyState == 2) {
                console.log("Header received");
            } else if (orderReq.readyState == 3) {
                console.log("loading");
            } else if (orderReq.readyState == 4) {
                console.log("Request Finished");
            }
        };
        orderReq.onload=function(){
            alert(orderReq.responseText);
        }
        orderReq.send(data);
    }
};

