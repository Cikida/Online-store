//CREATING FUNCTIONS FOR THE LANDING AND ITEM PAGES///

//Allow a “quick add to cart” from the catalog page and from the item pages//
let carts = document.querySelectorAll('.add-cart'); //Adding all the cart items using the class add-cart//

//Creating the object with all the product details//
let products = [{
        name: "The Humi Number One Bag",
        tag: "numberone",
        price: 5000,
        inCart: 0
    },
    {
        name: "The Humi Number Two Bag",
        tag: "numbertwo",
        price: 10000,
        inCart: 0
    },
    {
        name: "The Humi Number Three Bag",
        tag: "numberthree",
        price: 3000,
        inCart: 0
    },
    {
        name: "The Humi Number Four Bag",
        tag: "numberfour",
        price: 6000,
        inCart: 0
    },
    {
        name: "The Humi Number Five Bag",
        tag: "numberfive",
        price: 7000,
        inCart: 0
    }
];

//For loop when "carts" is clicked on that can update the total number of items in the cart and the total value of the cart//
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

//Creating the cartNumbers function//
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers'); //initial local storage will be null//
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (action) { //We add this action for the decrease button which is defined below
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1); //We are setting the new cartNumbers value to productNumbers + 1 in the storage IF productNumbers is not null//
        document.querySelector('.cart span').textContent = productNumbers + 1; //This changes the span content to "productNumbers (not null) +1" which displays at the top of the page
    } else {
        localStorage.setItem("cartNumbers", 1); //If productNumbers is null, cartNumbers =1.
        document.querySelector('.cart span').textContent = 1; //this pulls the content of the span and changes it from 0 to 1 which displays at the top of the page
    }
    setItems(product); //calling the setItems function which defines the specific items below
}
//Function to make sure that what is on the local storage is reflected on the page (even when we refresh)//
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers; //If productNumbers is not null the span text should be equal to it
    }
}
onLoadCartNumbers(); //Calling the onload function

//Creating each product when selected within the local storage using a function
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    //If cartItems is not null it could either be the selected item (selected before) or an undefined value (another item selected) We create a nested if loop for both scenarios//
    if (cartItems != null) {
        let currentProduct = product.tag; //current product already selected- We create a key for it using the tag. The value will be the product array.

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems, // Cart items equals whatever was in the cart items before plus the selected product
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1; //Increase the inCart value of what we just selected by 1

    } else { //Else is for if the Cart was empty, we increase the inCart for the selected
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

//Adding the total cost function to add the total cost when the cart is updated//
function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");
    let totalprice = cart;
    if (action) { //We add this action for the decrease button which is defined below
        cart = parseInt(cart);
        totalprice = cart - product.price;
        alert("The total value of your basket is " + "R" + totalprice); //When an item is added, an alert should tell the user what the current total is.//
        localStorage.setItem("totalCost", cart - product.price);
    } else if (cart != null) {
        cart = parseInt(cart);
        totalprice = cart + product.price;
        alert("The total value of your basket is " + "R" + totalprice); //When an item is added, an alert should tell the user what the current total is.//
        localStorage.setItem("totalCost", cart + product.price);

    } else {
        totalprice = product.price;
        alert("The total value of your basket is " + "R" + totalprice); //When an item is added, an alert should tell the user what the current total is.//
        localStorage.setItem("totalCost", product.price);
    }
}

//CREATING FUNCTIONS FOR THE CART PAGE///
//Create function to display cart in the relevant page//

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart'); //Defining cart items and total cost again for this page//
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products'); //We will place the items within the div container we created on the HTML page

    if (cartItems && productContainer) {
        productContainer.innerHTML = ''; //If we have cart items and the product container is not empty then we empty the page to begin with-first run//
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML += //Then we want to check the values of the objects we have in the local storage and add each one (without overriding) to the product container//
                //We create a div container to add all the items in using the key "item" and the respective values//
                `<div class="product"><ion-icon name="trash-outline"></ion-icon><img src="./humi.3/${item.tag}.png" style="width:10em; height:4em;" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="prices sm-hide">R${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="remove-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="add-circle-outline"></ion-icon>   
            </div>
            <div class="total">R${item.inCart * item.price},00</div>`;
        });


        // We also add a div container for the totals which will include the VAT)
        productContainer.innerHTML += `   
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total (incl. VAT + Delivery + Discount)</h4>
                <h4 class="basketTotal">R${Math.round(cart*1.15)},00</h4> 
            </div>` ///Your total should change based on what delivery option is chosen and whether a discount coupon applied.//



        deleteButtons(); //We call the functions deleteButtons and manageQuantity here. Which are defined below//
        manageQuantity();


    }
}


displayCart();


// We also create an event to change the delivery fee once the form is changed
function addDelivery() {
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    let deliveryAmnt = document.getElementById('select_id').value;
    deliveryAmnt = parseInt(deliveryAmnt);

    document.getElementById('deliveryvalue').innerHTML = "R" + deliveryAmnt;
    cartCost = cartCost + deliveryAmnt;
    localStorage.setItem('totalCost', cartCost);
    displayCart()
}


//We create a function that will change the basket value based on the discount value

function addPromoCode() {
    let promocode = document.getElementById("PC").value;
    let discount = ''
    let cartCost = localStorage.getItem("totalCost");
    if (promocode == "DISCOUNT10") {
        discount = 0.1;
        localStorage.setItem('totalCost', cartCost * (1 - discount));
        alert("Your 10% discount has been applied");
    } else if (promocode == "DISCOUNT20") {
        discount = 0.2;
        localStorage.setItem('totalCost', cartCost * (1 - discount))
        alert("Your 20% discount has been applied");
    } else if (promocode == "DISCOUNT30") {
        discount = 0.3;
        localStorage.setItem('totalCost', cartCost * (1 - discount))
        alert("Your 30% discount has been applied");
    } else {
        discount = 0;
        alert("Incorrect promocode");
    };
    displayCart()
};


//Create A “confirm order” button which alerts the user that their order was successful and generates them a reference number( keyword:generate)//

function confirmOrder() {
    let orderno = Math.floor(new Date().valueOf() * Math.random());
    let text = "Confirm your order!";
    if (confirm(text) == true) {
        alert("Your order is confirmed! Your order number is " + orderno);
        text = "Your order is confirmed! Your order number is " + orderno;
    } else {
        alert("You order is not yet confirmed!");
        text = "You order is not yet confirmed!";
    }
    document.getElementById('demo').innerHTML = text;

};

//We define the deleteButtons function to allow us to delete an item that we have selected altogether //
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon'); //Selecting class product as described above with element ion-ion (i.e the trash icon)//
    let productNumbers = localStorage.getItem('cartNumbers'); //Fetching the products, no of items and total cost for each selection
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    //Creating a for loop to perform the deleting function//
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => { //Creating an event for when we click on the function "deleteButtons"//
            productName = deleteButtons[i].parentElement.textContent.replace("The Humi", "").replace("Bag", "").toLocaleLowerCase().replace(/ /g, '').trim(); //Here we are calling the item key for each button as stored in the local storage (). We do this by calling the product name then removing the parts that don't for a part of the tag then making them all lower case. Basically converting "The Humi Number One Bag" to "numberone"

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart); // Total cart items minus the cart items of this specific product. We do this to change the 'cartNumbers' value once this item has been deleted
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart)); // Total cost value minus the total cost of this specific item. We do this to change the 'totalCost' value once this item has been deleted//

            delete cartItems[productName]; // Deletes the product from 'productsInCart'//
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart(); // adding this so the cart on the page updates with all the above changes//
            onLoadCartNumbers(); // adding this so the cart tab at the top updates with all the above changes//

        })
    }
}

//Now we define a function that will allow us to add or reduce item quanities from the cart page//
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease'); //Calling the incr and dec elements by their classes//
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    //Creating a for loop for 
    for (let i = 0; i < increaseButtons.length; i++) {
        //Creating a function for when the decrease button icon is clicked
        decreaseButtons[i].addEventListener('click', () => {

            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent; //Defining QTY as the span value from the product container we created in the displayCart function
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.replace("The Humi", "").replace("Bag", "").toLocaleLowerCase().replace(/ /g, '').trim(); //Defining product by the key. We are selecting the item name from 2 div elements above the "decrease class" parent element and then converting it into a key (by removing The HUMI Bag) 

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1; //Minus the incart products by one when the element is clicked
                cartNumbers(cartItems[currentProduct], "oneless"); //update the function cartNumbers, with an action of decreasing which we defined in the function above
                totalCost(cartItems[currentProduct], "oneless"); //update the function totalCost, with an action of decreasing which we defined in the function above
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
        //Creating a function for when the increase button icon is clicked
        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent; //Defining QTY as the span value from the product container we created in the displayCart function
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.replace("The Humi", "").replace("Bag", "").toLocaleLowerCase().replace(/ /g, '').trim(); //Defining product by the key. We are selecting the item name from 2 div elements above the "decrease class" parent element and then converting it into a key (by removing The HUMI Bag) 
            cartItems[currentProduct].inCart += 1; //Add the incart products by one when the element is clicked
            cartNumbers(cartItems[currentProduct]); //update the function cartNumbers
            totalCost(cartItems[currentProduct]); //update the function totalCost
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}