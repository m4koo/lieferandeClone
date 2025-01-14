let food = ['Chilli Cheeseburger (scharf)', 'Double Beef-Burger', 'Classic Hamburger'];
let ingredients = ['mit 160g Patty, frischen Jalapenos und Chili-Cheesesauce im Brioche', 'mit 2x 160g Patty, Onion-Jam und Cheddar im Brioche', 'mit 160g Patty im Brioche'];
let price = [13.90, 18.90, 12.90];

let basketFood = [];
let basketPrice = [];
let amount = [];

let counter = 0;

// RENDER
function render() {
    for (let i = 0; i < food.length; i++) {
        generateItemsHTML(i);
    }
}

function renderBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML =`
    <div id="basketHead">
        <div></div>
        <h2>Warenkorb</h2>
        <button id="closeBasket" onclick="closeBasket()"><img src="img/svg/close.svg"></button>
    </div>`;
    if (basketFood.length > 0){
        for (let i = 0; i < basketFood.length; i++) {
            generateBasketItemHTML(i);
        }
    }else{
        generateEmptyBasket(basket);
    }
}

// BASKET
function addToBasket(i) {
    let addedFood = food[i];
    let addedPrice = price[i];
    let index = basketFood.indexOf(addedFood);
    if(index === -1){
        basketFood.push(addedFood);
        basketPrice.push(addedPrice);
        amount.push(1);
    }else{
        amount[index] += 1;
    }
    addToBasketCounter();
    renderBasket();
    generateTotalPrice();
}

function addAmount(i){
    amount[i]++;
    addToBasketCounter();
    renderBasket();
    generateTotalPrice();
}

function removeFromBasket(i){
    if(amount[i] === 1){
        basketFood.splice(i, 1);
        basketPrice.splice(i, 1);
        amount.splice(i, 1);  
    }else {
        amount[i] -= 1;
    }
    renderBasket();
    removeFromBasketCounter();
    if(amount.length > 0){
        generateTotalPrice();
    }
}

function renderBasketCounter(){
    let basketCount = document.getElementById('numberCircle');
    basketCount.innerHTML = `${counter}`;
    if (counter >= 1){
        basketCount.style.display="inline-flex";  
    }else if (counter >= 10){
        basketCount.style.fontSize="10px"
    }else if(counter >= 100){
        basketCount.style.fontSize="8px"
        basketCount.innerHTML='99+'
    }else {
        basketCount.style.display="none";
    }
}

function addToBasketCounter(){
    counter++;
    renderBasketCounter();
}

function removeFromBasketCounter(){
    counter--;
    renderBasketCounter();
}

// HTML GENERATOR
function generateItemsHTML(i){
    let items = document.getElementById('items');
    items.innerHTML += `
        <div class="item-card" onclick="addToBasket(${i})">
            <h3>${food[i]}</h3>
            <p>${ingredients[i]}</p>
            <div>${price[i].toFixed(2).replace(".",",")}€</div>
            <button><img src="img/svg/plus.svg"></button>
        </div>
    `;
}

function generateBasketItemHTML(i) {
    document.getElementById('basket').innerHTML += `
        <div class='basket-items' id='basket-item${i}'>
            <h3><span>${amount[i]}</span>${basketFood[i]}</h3>
            <span>${(amount[i] * basketPrice[i]).toFixed(2).replace(".",",")}€</span>
            <div id="amount-buttons">
                <span class="notImplemented" data-hover="Mich gibt es nur aus Style gründen.">Anmerkung hinzufügen</span>
                <button onclick="addAmount(${i})"><img src="img/svg/plus.svg"></button>
                <button onclick="removeFromBasket(${i})"><img src="img/svg/minus.svg"></button>
            </div>
        </div>
    `;
}

function generateEmptyBasket(basket){
    basket.innerHTML += `
        <div id="empty">
            <img src="img/svg/shopping-bag.svg">
            <h3>Fülle deinen Warenkorb</h3>
            <span>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
        </div>
    `; 
}

function generateTotalPrice() {
    let rawCost = calcCost();
    let totalCost = rawCost + 1.99 + 0.89;
    document.getElementById('basket').innerHTML +=`
        <div id="total-bill">
            <span class="grey">Mindestbestellwert: 20,00€</span>
            <span>Zwischensumme: ${rawCost.toFixed(2).replace(".",",")}€</span>
            <span>Lieferkosten: 1,99€</span>
            <span>Servicegebühr: 0,89€</span>
            <span class="bold">Gesamt: ${totalCost.toFixed(2).replace(".",",")}€</span>
            <button id="pay">${minPurchase(totalCost).replace(".",",")}</button> 
        </div>
    `; 
}

// CALCULATOR
function calcCost(){
    let rawCost = 0;
    for (let i = 0; i < basketPrice.length; i++) {
        rawCost += basketPrice[i] * amount[i];
    }
    return rawCost;
}

function minPurchase(total){
    let minValue = 20.00;
    if (total >= minValue){
        return 'Bezahlen (' + total.toFixed(2) + '€)'
    }else{
        return "Mindestbestellwert nicht erfüllt"
    }
}

// MOBILE BASKET BUTTON
const slidein = [
    {top: '100%'},
    {top: '0'}
];

const slideout = [
    {top: '0'},
    {top: '100%'}
];

function openBasket(){
    let basket = document.getElementById('basket');
    let shop = document.getElementById('shop');
    basket.style.display="block";
    basket.animate(slidein, 125);
    shop.style.display="none";
}

function closeBasket(){
    let basket = document.getElementById('basket');
    let shop = document.getElementById('shop');

    basket.animate(slideout, 125);
    setTimeout(() => {
        basket.style.display="none";
      }, "125")
    shop.style.display="block"
}