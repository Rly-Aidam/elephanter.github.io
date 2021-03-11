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


(function () {
    'use strict'
  
    
    var forms = document.querySelectorAll('.needs-validation')
  
    
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event){
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }  
          form.classList.add('was-validated')
          submitData();          
        }, false)
        
      })
})()

function submitData(){
    let name = document.querySelector("#firstName").value;
    let lastname = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let address = document.querySelector("#address").value;    
    let zeme = document.querySelector("#country").value;
    let mesto = document.querySelector("#state").value;
    let PSC = document.querySelector("#zip").value; 
    let platba = document.querySelector("#platba").value;
      

    sessionStorage.setItem('name', name);
    sessionStorage.setItem('lastname', lastname);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('address', address);    
    sessionStorage.setItem('zeme', zeme);
    sessionStorage.setItem('mesto', mesto);
    sessionStorage.setItem('PSC', PSC);
    sessionStorage.setItem('platba', platba);        
}

function senEmail(){
    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems); 
    let cartCost = sessionStorage.getItem('totalCost');  
    let random =   Math.random()*100000;
    let cisloOB = Math.round(random);
    sessionStorage.setItem('cisloOB', cisloOB);
    

                    let name = sessionStorage.getItem('name');
                    let lastname = sessionStorage.getItem('lastname');
                    let email = sessionStorage.getItem('email');
                    let address = sessionStorage.getItem('address');                    
                    let zeme = sessionStorage.getItem('zeme');
                    let mesto = sessionStorage.getItem('mesto');
                    let PSC = sessionStorage.getItem('PSC');
                    let platba = sessionStorage.getItem('platba');  
                    cisloOB = sessionStorage.getItem('cisloOB');                 
                    var items; 

                    Object.values(cartItems).map(item => {
                        items +=`Produkt: ${item.name}<br/>        
                                 Cene produktu: ${item.price},-<br/>
                                 Počet: ${item.inCart}<br/>
                                 Celkem za produkt: ${item.inCart * item.price},-<br/>
                                 <hr>                                  
                                 `
                    })           

    Email.send({                                   
        SecureToken:"6406f46f-6d63-43f2-b614-49869645f289",
        To: 'apostrofa159@gmail.com',
        From: 'apostrofa159@gmail.com',
        Subject: `${name } odeslal objednávku`,
        Body: `Jméno: ${name} <br/>  
               Přijmení: ${lastname} <br/>
               Email: ${email} <br/>
               Adresa: ${address} <br/>              
               Země: ${zeme} <br/>
               Město: ${mesto} <br/>
               PSČ: ${PSC} <br/>
               Způsob platby: ${platba} <br/>   
               Číslo objednávky: ${cisloOB}<br/>                
               <hr> 
               <hr>
               ${items}               
               <strong>${cartCost}</strong>                                     
                `                                                     
    }).then((message) => alert("Objednávka odeslána. Děkujeme za nákup"), 
        sessionStorage.clear()        
    )

    if(platba == "Osobní odběr" ){
        Email.send({
            SecureToken:"6406f46f-6d63-43f2-b614-49869645f289",
            To: `${email}`,
            From: 'apostrofa159@gmail.com',
            Subject: `Elephanter - objednávka`,
            Body: `<h1>Vaše objednávka byla přijata a čeká na Vás.</h1><br/>    
                   <h2>Zboží na vás bude čekat 7 dní na adrese Havlovská 31</h2><br/> 
                   <h4> Číslo objednávky: ${cisloOB}</h4><br/>          
                   <p>Objednal jste si položky: </br>
                   <hr>
                   <hr>
                   ${items}  
                   </p>
                   <h2>Děkujeme za nákup a doufáme, že s naším produktem budete spokojení.</h2></br>
                   <h1>Elephanter</h1>
            `
        })

    } else if(platba == "Dobírka"){
        Email.send({
            SecureToken:"6406f46f-6d63-43f2-b614-49869645f289",
            To: `${email}`,
            From: 'apostrofa159@gmail.com',
            Subject: `Elephanter - objednávka`,
            Body: `<h1>Vaše objednávka byla přijata a čeká na Expandaci.</h1><br/>    
                   <h2>Až zboží odešleme, budeme vás o tom informovat.</h2><br/>   
                   <h4> Číslo objednávky: ${cisloOB}</h4><br/>       
                   <p>Objednal jste si položky: </br>
                   <hr>
                   <hr>
                   ${items}  
                   </p>
                   <h2>Děkujeme za nákup a doufáme, že s naším produktem budete spokojení.</h2></br>
                   <h1>Elephanter</h1>
            `
        })

    } else if(platba == "Bankovní převod"){
        Email.send({
            SecureToken:"6406f46f-6d63-43f2-b614-49869645f289",
            To: `${email}`,
            From: 'apostrofa159@gmail.com',
            Subject: `Elephanter - objednávka`,
            Body: `<h1>Vaše objednávka byla přijata a čeká na expandaci.</h1><br/>    
                   <h2>Prosíme o uhrazení částky na účet:  2113235382/2700.</h2><br/>
                   <strong>Nezapomeňte vyplnit variabilní symbol, který je stejný jako číslo objednávky.</br>
                   Bez něj nebude možné vaši platbu identifikovat</strong> 
                   <h4> Číslo objednávky: ${cisloOB}</h4><br/>          
                   <p>Objednal jste si položky: </br>
                   <hr>
                   <hr>
                   ${items}  
                   </p>
                   <h2>Děkujeme za nákup a doufáme, že s naším produktem budete spokojení.</h2></br>
                   <h1>Elephanter</h1>
            `
        })

    }    
} 
  

window.onload = function() {
    var reloading = sessionStorage.getItem("address");
    if (reloading != null) {
        senEmail();
    }
}


showCart();
spanNone();
onLoadCartNumbers(); 