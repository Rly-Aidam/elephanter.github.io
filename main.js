let carts = document.querySelectorAll('.pro-add')

var x = 0;
function idProduktu() {
    var a = document.getElementsByClassName("a");
    x = a.length;    
}

function spanNone(){ 
    let b = document.getElementById('span');
    let vis = sessionStorage.getItem('cartNumbers');
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
    let productNumbers = sessionStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.kosik span').textContent = productNumbers;
    }
}

function cartNumbers(product) {    
    let productNumbers = sessionStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {

        sessionStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.kosik span').textContent = productNumbers + 1;

    } else {

        sessionStorage.setItem('cartNumbers', 1);
        document.querySelector('.kosik span').textContent = 1;

    }
    setItems(product);   
}

function setItems(product){
    let cartItems = sessionStorage.getItem('productsInCart');
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
    sessionStorage.setItem("productsInCart", JSON.stringify 
    (cartItems));    
}

function totalCost(product){   
      
    let cartCost = sessionStorage.getItem('totalCost');      

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        sessionStorage.setItem("totalCost", cartCost + product.price);
    } else {
        sessionStorage.setItem("totalCost", product.price);         
    }  
}

function delItem(){          
    sessionStorage.removeItem("productsInCart"); 
    sessionStorage.removeItem( "totalCost");
    sessionStorage.removeItem("cartNumbers");
    location.reload();
}

function showCart() {
    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".container-produktu");
    let cartCost = sessionStorage.getItem('totalCost');    

    if (cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `              
              <div class="produkt-kosik">                                            
                 <img src="produkty/vykosteny/${item.tag}.png" class="produktPic">
                 <span class="nazev">${item.name}</span>              
                 <span class="cena-zbozi">${item.price},-</span>
                 <span class="mnozstvi">${item.inCart}</span>
                 <span class="celkem">${item.inCart * item.price},-</span>
              </div>         
              `
            });               
            productContainer.innerHTML +=`
               <div class="kosikCelkove d-flex">
               <img src="pics/x-circle.png" class="del" onclick="delItem();">
                  <span class="kosikCelkoveNadpis">
                    Celkem k úhradě
                  </span>  
                  <span class="kuhrade">
                    ${cartCost},-
                  </span>
               </div  
            `
            productContainer.innerHTML +=`
               <div class="tlacitko-objednat">
                   <a href="formular.html">
                   <button type="submit"  class="btn"  >Pokračovat k objednávce</button>     
                   </a>       
               </div  
            `
    }   
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }  
          form.classList.add('was-validated')
        }, false)
      })
})()
  
function Odeslat() {
    alert("Děkujeme za nákup!");
}



showCart();
spanNone();
onLoadCartNumbers();