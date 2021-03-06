let carts = document.querySelectorAll('.pro-add')

var x = 0;
function myFunction() {
    var a = document.getElementsByClassName("a");
    x = a.length;
    console.log(x)
}

function spanNone(){ 
    let b = document.getElementById('span');
    let vis = localStorage.getItem('cartNumbers');
    vis = parseInt(vis);
  if(vis != null){
       b.style.display = "";   
  }
}

let products = [     
    
   {      
        name: "Bunda Elephanter",
        tag: "1",
        price: 1500,
        inCart: 0,

    },    


    {      
        name: "Double color",
        tag: "2",
        price: 700,
        inCart: 0,

    },

    {      
        name: "Single color",
        tag: "3",
        price: 700,
        inCart: 0,

    },

    {      
        name: "Polo shirt",
        tag: "4",
        price: 700,
        inCart: 0,

    },

    {      
        name: "Čepice",
        tag: "5",
        price: 300,
        inCart: 0,

    },

    {      
        name: "Klobouk",
        tag: "6",
        price: 600,
        inCart: 0,

    }

]

for (let i=0; i < carts.length; i++) {
    carts[x].addEventListener('click', () => {        
        cartNumbers(products[x]);
        totalCost(products[x]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.kosik span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    console.log("The product clicked is", product);
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);


    if( productNumbers ) {

        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.kosik span').textContent = productNumbers + 1;

    } else {

        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.kosik span').textContent = 1;

    }

    setItems(product);   

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    
    if(cartItems != null){

    if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
         product.inCart = 1;    
         cartItems = {          
            [product.tag]: product
       }   
    }   
    
    localStorage.setItem("productsInCart", JSON.stringify 
    (cartItems));

    console.log("My cartitems are", cartItems);
}

function totalCost(product){
    //console.log("price is", product.price);
      
    let cartCost = localStorage.getItem('totalCost');  
    

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);         
    }

    console.log("cost is",  cartCost);

}

function dispayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".container-produktu");

    console.log(cartItems);

    if (cartItems && productContainer ){
         productContainer.innerHTML = '';
         Object.values(cartItems).map(item => {
              productContainer.innerHTML += `              
              <div class="produkt-kosik">
                 <img src="produkty/vykosteny/${item.tag}.png">
                 <span class="nazev">${item.name}</span>              
                 <span class="cena-zbozi">${item.price}</span>
                 <span class="mnozstvi">${item.inCart}</span>
                 <span class="celkem">${item.inCart * item.price}</span>
              </div>              
              `
         });        
    }
    

}


dispayCart();
spanNone();
onLoadCartNumbers();