if (localStorage.getItem("foods") && JSON.parse(localStorage.getItem("foods")).length === 25) { // Update when added more items (Will Reset Account Foods)
    window.foods = JSON.parse(localStorage.getItem("foods"))
} else {
    window.foods = [
        {
            name: "Apple",
            tier: "common",
            amount: 0,
            weight: 30
        },
        {
            name: "Orange",
            tier: "common",
            amount: 0,
            weight: 30
        },
        {
            name: "Banana",
            tier: "common",
            amount: 0,
            weight: 30
        },
        {
            name: "Carrot",
            tier: "common",
            amount: 0,
            weight: 30
        },
        {
            name: "Pineapple",
            tier: "common",
            amount: 0,
            weight: 30
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
            name: "Watermelon",
            tier: "uncommon",
            amount: 0,
            weight: 15
        },
        {
            name: "Kiwi Fruit",
            tier: "uncommon",
            amount: 0,
            weight: 15
        },
        {
            name: "Pumpkin",
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
            name: "Cherry",
            tier: "rare",
            amount: 0,
            weight: 10
        },
        {
            name: "Avocado",
            tier: "rare",
            amount: 0,
            weight: 10
        },
        {
            name: "Mushroom",
            tier: "rare",
            amount: 0,
            weight: 10
        },
        {
            name: "Toast",
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
            name: "Pretzel",
            tier: "legendary",
            amount: 0,
            weight: 5
        },
        {
            name: "Taco",
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
        {
            name: "Pancakes",
            tier: "epic",
            amount: 0,
            weight: 1
        },
        {
            name: "Ice Cream",
            tier: "epic",
            amount: 0,
            weight: 1
        },
        {
            name: "Bacon",
            tier: "epic",
            amount: 0,
            weight: 1
        },
    ]
}

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