let food = ['Chilli Cheeseburger (scharf)', 'Double Beef-Burger', 'Clasic Hamburger'];
let ingredients = ['mit 160g Patty, frischen Jalapenos und Chili-Cheesesauce im Brioche', 'mit 2x 160g Patty, Onion-Jam und Cheddar im Brioche', 'mit 160g Patty im Brioche'];
let price = ['13.90', '18.90', '12.90'];

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
    document.getElementById('empty').innerHTML='';
    generateBasketItemHTML(i);
}

function generateBasketItemHTML(i) {
    document.getElementById('basket').innerHTML += `
        <div class='basket-items' id='baskter-item${i}'>
            <h3>${food[i]}</h3>
            <span>${price[i]}$</span>
        </div>
    `;
}
