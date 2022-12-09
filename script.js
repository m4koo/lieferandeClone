let food = ['Chilli Cheeseburger (scharf)', 'Double Beef-Burger', 'Clasic Hamburger'];
let ingredients = ['mit 160g Patty, frischen Jalapenos und Chili-Cheesesauce im Brioche', 'mit 2x 160g Patty, Onion-Jam und Cheddar im Brioche', 'mit 160g Patty im Brioche'];
let price = ['13.90', '18.90', '12.90'];

let basketFood = [];
let basketPrice = [];
let amount = [];

function render() {
    for (let i = 0; i < food.length; i++) {
        generateItemsHTML(i);
    }
}


function generateItemsHTML(i){
    let items = document.getElementById('items');

    items.innerHTML += `
        <div class="item-card" onclick="addToBasket(${i})">
            <h3>${food[i]}</h3>
            <p>${ingredients[i]}</p>
            <div>${price[i]}$</div>
            <button><img src="img/svg/plus.svg"></button>
        </div>
    `;
}

function addToBasket(i) {
    // document.getElementById('empty').innerHTML='';
    // generateBasketItemHTML(i);
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

    renderBasket();
}

function renderBasket() {
    document.getElementById('basket').innerHTML ='<h2>Warenkorb</h2>';
    for (let i = 0; i < basketFood.length; i++) {
        generateBasketItemHTML(i);
    }
}

function generateBasketItemHTML(i) {
    document.getElementById('basket').innerHTML += `
        <div class='basket-items' id='baskter-item${i}'>
            <h3>${amount[i]}x ${basketFood[i]}</h3>
            <span>${basketPrice[i]}$</span>
        </div>
    `;
}
