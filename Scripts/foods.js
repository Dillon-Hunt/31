window.foods = localStorage.getItem("foods") ? JSON.parse(localStorage.getItem("foods")) : [
    {
        name: "Apple",
        tier: "common",
        amount: 0,
        weight: 20
    },
    {
        name: "Orange",
        tier: "common",
        amount: 0,
        weight: 20
    },
    {
        name: "Banana",
        tier: "common",
        amount: 0,
        weight: 20
    },
    {
        name: "Carrot",
        tier: "common",
        amount: 0,
        weight: 20
    },
    {
        name: "Lemon",
        tier: "uncommon",
        amount: 0,
        weight: 15
    },
    {
        name: "Tomato",
        tier: "uncommon",
        amount: 0,
        weight: 15
    },
    {
        name: "Strawberry",
        tier: "uncommon",
        amount: 0,
        weight: 15
    },
    {
        name: "Pear",
        tier: "uncommon",
        amount: 0,
        weight: 15
    },
    {
        name: "Chili",
        tier: "rare",
        amount: 0,
        weight: 10
    },
    {
        name: "Waffle",
        tier: "legendary",
        amount: 0,
        weight: 5
    },
    {
        name: "Cake",
        tier: "epic",
        amount: 0,
        weight: 1
    },
    {
        name: "Muffin",
        tier: "epic",
        amount: 0,
        weight: 1
    },
]

window.foods.forEach(food => {
    element = document.createElement("div")
    element.classList.add("item")
    if (food.amount == 0) {
        element.innerHTML = (`
            <img class="none" src="./images/${food.name.toLowerCase()}.png">
            <p>Unknown</p>
        `)
    } else {
        element.innerHTML = (`
            <img src="./images/${food.name.toLowerCase()}.png">
            <p>${food.name}</p>
            <p class="amount">x${food.amount}</p>
        `)
    }
    document.querySelector("." + food.tier).appendChild(element)
})

localStorage.setItem("foods", JSON.stringify(window.foods))

delete window.foods