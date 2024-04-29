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


let products = [
    {
        id: 1,
        name: "PRODUCT 1",
        images: "1.png",
        price: 50
    },
    {
        id: 2,
        name: "PRODUCT 2",
        images: "2.png",
        price: 100
    },
    {
        id: 3,
        name: "PRODUCT 3",
        images: "3.png",
        price: 80
    },
    {
        id: 4,
        name: "PRODUCT 4",
        images: "4.png",
        price: 75
    },

    {
        id: 5,
        name: "PRODUCT 5",
        images: "5.png",
        price: 10
    },
    {
        id: 6,
        name: "PRODUCT 6",
        images: "6.png",
        price: 120
    },
]

let listCards = [];

const initApp = () => {
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
        list.appendChild(newDiv);
    });
}

initApp();

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
