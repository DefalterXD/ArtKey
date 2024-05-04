const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});
// функция которая срабатывает после всего файла html - получает список товаров и отображает в блоке
$(document).ready(function(){
    $.ajax({
        url: 'database/php/select.php', // Замените на путь к вашему PHP-скрипту
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Обработка успешного ответа
            products = response
                products.forEach((value, key) => {
                    let newDiv = document.createElement("div");
                    newDiv.classList.add("item");
                    newDiv.innerHTML = `
        <img src = "img/${value.images}">
        <div class = "title">${value.name}</div>
        <div class = "price">${value.price.toLocaleString()}$</div>
        <button onclick="addToCard(${key})">Add To Card</
        button>
        `
            list.appendChild(newDiv);});
            console.log(response); // Вывод данных в консоль для проверки
            // Далее вы можете выполнить любые операции с полученными данными
        },
        error: function(xhr, status, error) {
            // Обработка ошибки
            console.error(error); // Вывод ошибки в консоль для отладки
        }
    });
});


let listCards = [];

const addToCard = (key) => {
    if(listCards[key] == null)
    {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }

    reloadCard();
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let totalPrice = 0;
    let count = 0; // Initialize count here

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;
            
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="img/${value.images}"></div>
                <div class="cardTitle">${value.name}</div>
                <div class="cardPrice">${(value.price * value.quantity).toLocaleString()}$</div>

                <div>
                    <button style="background-color: #000" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button style="background-color: #000" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    // Update total and count
    total.innerText = totalPrice.toLocaleString() + "$";
    quantity.innerText = count;
}


const changeQuantity = (key, quantity) => {
    if(quantity == 0)
    {
        delete listCards[key];
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity + products[key].price;
    }
    reloadCard();
}
