let food = ['test'];
let ingredients = ['test'];
let price = [4];

function render() {
    for (let i = 0; i < food.length; i++) {
        generateItemsHTML(i);
    }
}


function generateItemsHTML(i){
    let items = document.getElementById('items');

    items.innerHTML += `
        <div class="item-card">
            <h3>${food[i]}</h3>
            <p>${ingredients[i]}</p>
            <div>${price[i]}</div>
            <button><img src="img/svg/plus.svg"></button>
        </div>
    `;
}