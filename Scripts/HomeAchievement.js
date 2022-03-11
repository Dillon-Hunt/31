class HomeAchievement {
    constructor (config) {
        this.achievement = config.achievement
        this.userData = config.userData
        this.key = config.key
    }

    createElement(container, resolve) {
        this.element = document.createElement('div')
        this.element.classList.add("achievement")
        this.element.classList.add("color1")
        this.element.style.display = "flex"
        this.element.innerHTML = (`
            <img class="achievement-image" src="./images/${this.achievement.image}.svg">
            <p class="achievement-name">${this.achievement.name}</p>
            <p class="achievement-level">Level ${this.achievement.level}</p>
            <p class="achievement-message">${this.achievement.nextText.replaceAll("{GOAL}", this.achievement.goal - this.achievement.increment).replaceAll(" to unlock the next achievement", "")}</p>
            <button class="reward-button color4">Get Reward Chest</button>
        `)

        this.achievement.chestLevel = this.achievement.chestLevel === undefined ? 0 : this.achievement.chestLevel
        this.userData.achievements[this.key].chestLevel = this.achievement.chestLevel

        if (this.userData.achievements[this.key].chestLevel < this.userData.achievements[this.key].level && this.userData.achievements[this.key].level != 0) {
            this.element.querySelector(".reward-button").onclick = () => {
                this.userData.achievements[this.key].chestLevel++
                if (this.userData.achievements[this.key].chestLevel === this.userData.achievements[this.key].level) {
                    this.element.querySelector(".reward-button").style.opacity = 0
                    this.element.querySelector(".reward-button").onclick = null
                }
                document.querySelector(".reward").style.display = "block"

                var foods = getFoods()
                var foodsArray = [];

                for(var i = 0; i < foods.length; i++) {
                    // Run through all foods

                    for(var x = 0; x < foods[i].weight; x++) {
                        // Run through all food weights

                        // Add food to foodsArray

                        if (foods[i].tier === "legendary") {
                            for (var j = 0; j <= 3; j++) {
                                foodsArray.push(foods[i])
                            }
                        } else if ( foods[i].tier === "epic") {
                            for (var j = 0; j <= 10; j++) {
                                foodsArray.push(foods[i])
                            }
                        } else {
                            foodsArray.push(foods[i])
                        }
                    }
                }

                // Pick a weighted random food
                var index = Math.floor(Math.random() * foodsArray.length);
                var randomFood = foodsArray[index];

                var analytics = firebase.analytics();

                analytics.logEvent("new_fruit", {
                    name: randomFood.name,
                    tier: randomFood.tier
                })

                this.userData.foods[randomFood.name.toLowerCase().replaceAll(" ", "")] += 1

                setUserData(this.userData)

                document.querySelector(".open-button").onclick = () => {
                    document.querySelector(".open-button").style.display = "none"
                    document.querySelector(".closed").style.display = "none"
                    document.querySelectorAll(".open").forEach(element => {
                        element.style.display = "block"
                    })
                    document.querySelector(".reward").classList.add("received")
                    if (randomFood.tier === "common") {
                        document.querySelector(".reward").style.backgroundColor = "#4271ff"
                    } else if (randomFood.tier === "uncommon") {
                        document.querySelector(".reward").style.backgroundColor = "#ff424b"
                    } else if (randomFood.tier === "rare") {
                        document.querySelector(".reward").style.backgroundColor = "#ff9242"
                    } else if (randomFood.tier === "legendary") {
                        document.querySelector(".reward").style.backgroundColor = "#dec209"
                    } else if (randomFood.tier === "epic") {
                        document.querySelector(".reward").style.backgroundColor = JSON.parse(localStorage.getItem("theme")).color4
                    }
                    document.querySelector(".fruit").style.animation = "rise 1s ease-in-out"
                    document.querySelector(".fruit").src = `./images/${randomFood.name.toLowerCase()}.png`
                    setTimeout(() => {
                        document.querySelector(".fruit").style.animation = ""
                        document.querySelector(".fruit").style.top = "90px"
                        document.querySelector(".reward").classList.remove("received")
                        document.querySelectorAll(".chest").forEach(chest => {
                            chest.style.transition = "0.2s"
                            chest.style.opacity = "0"
                        })
                        setTimeout(() => {
                            document.querySelector(".found-message-tier").textContent = randomFood.tier
                            document.querySelector(".found-message-tier").style.display = "block"
                            document.querySelector(".found-message").textContent = this.userData.userInfo.username + " found a " + randomFood.name + "."
                            document.querySelector(".found-message").style.display = "block"
                        }, 200)
                    }, 1000)
                }
                document.querySelector(".next-button").onclick = () => {
                    document.querySelector(".reward").style.display = "none"
                    document.querySelector(".fruit").style.animation = ""
                    document.querySelector(".fruit").style.top = "90px"
                    document.querySelector(".reward").classList.remove("received")
                }
            }
        } else {
            this.element.querySelector(".reward-button").style.opacity = 0
        }
        container.appendChild(this.element)
        resolve()
    }

    removeElement() {
        this.element.remove()
    }

    init(container) {
        return new Promise((resolve) => {
            this.createElement(container, resolve)
        })
    }
}