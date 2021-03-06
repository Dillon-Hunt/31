window.onload = async () => {
    const analytics = firebase.analytics()
    analytics.logEvent("home_page")

    userData = await authUser()


    if (userData !== "Error") {
        
        await createLeaderboard()

        if (userData.foods.goldenapple === undefined) {
            userData.foods.goldenapple = 0
            setUserData(userData)
        }

        var keys = []

        var achievements = Object.keys(userData.achievements).map(key => {
            keys.push(key)
            return userData.achievements[key]
        });

        var index = 0
        achievements.forEach(async achievement => {
            let newAchievement = new HomeAchievement({ achievement: achievement, userData, key: keys[index]})
            index++
            await newAchievement.init(document.querySelector(".achievements"))
        })

        updateTheme() // Keep Theme Local

        document.querySelector(".level-text").textContent = "Level " + userData.stats.level

        getFoods().forEach(food => {
            element = document.createElement("div")
            element.classList.add("item")
            amount = userData.foods[food.name.toLowerCase().replaceAll(" ", "")]
            if (amount == 0) {
                element.innerHTML = (`
                    <img class="none" src="./images/${food.name.toLowerCase()}.png">
                    <p>Unknown</p>
                `)
            } else {
                element.innerHTML = (`
                    <img src="./images/${food.name.toLowerCase()}.png">
                    <p>${food.name}</p>
                    <p class="amount">x${amount}</p>
                `)
            }
            document.querySelector("." + food.tier).appendChild(element)
        })
        
        // Title
        document.querySelector(".player-stats").textContent = userData.userInfo.name + "'s Stats"

        // Level
        document.querySelector(".level-text").textContent = "Level " + userData.stats.level
        document.querySelector(".level-subtext").textContent = (500 - (userData.stats.points % 500)) + " Points Until Next Level"
        document.querySelector(".level-progress").style.width = ((userData.stats.points % 500) / 500 * 100) + "%"

        // Score

        // Win : Tie : Loss Ratio
        document.querySelector(".wl-text").textContent = "Win : Tie : Loss"
        document.querySelector(".wl-subtext").textContent = "Ratio " + userData.stats.wins + " : " + userData.stats.ties + " : " + userData.stats.losses
        document.querySelector(".win-progress").style.width = userData.stats.wins ? (userData.stats.wins / userData.stats.games * 100) + "%" : "0%"
        document.querySelector(".tie-progress").style.width = userData.stats.ties ? (userData.stats.ties / userData.stats.games * 100) + "%" : "0%"

        // Stats
        document.querySelector(".games").textContent = userData.stats.games || "0"
        document.querySelector(".fastest-win").textContent = userData.stats.fastestWin !== 0 ? (userData.stats.fastestWin + (userData.stats.fastestWin === 1 ? " Turn" : " Turns")) : "No Data"
        document.querySelector(".average-win").textContent = userData.stats.averageWin !== 0 ? (Math.floor(userData.stats.averageWin) + (Math.floor(userData.stats.averageWin) === 1 ? "Turn" : " Turns")) : "No Data"
        document.querySelector(".fastest-loss").textContent = userData.stats.fastestLoss !== 0 ? (userData.stats.fastestLoss + (userData.stats.fastestLoss === 1 ? " Turn" : " Turns")) :  "No Data"
        document.querySelector(".average-loss").textContent = userData.stats.averageLoss !== 0 ? (Math.floor(userData.stats.averageLoss) + (Math.floor(userData.stats.averageLoss) === 1 ? " Turn" : " Turns")) :  "No Data"
    
        // Settings
        document.querySelector(".name").placeholder = userData.userInfo.name
        document.querySelector(".username").placeholder = userData.userInfo.username
        document.querySelector(".accessability").checked = localStorage.accessible === "1" ? 1 : 0

        document.querySelector(".loading").style.display = "none"

        /* Fake data at the moment
        document.querySelector(".score-text").textContent = "Score " + 525
        document.querySelector(".score-subtext").textContent = "Win " + 5 + " more games to increase your score"
        document.querySelector(".score-progress").style.width = "50%" // To Do: Create score
        */
    }
}

document.querySelectorAll(".play-button").forEach(button => {
    button.onclick = () => {
        window.location.href = "./computer.html"
    }
})


document.querySelector(".save-button").onclick = async () => {

    const snapshot = await firebase.firestore().collection('Users').get().then((snapshotData) => {
        return snapshotData.docs.map(doc => doc.data())
    })

    var usernameTaken = false
    
    snapshot.forEach(user => {
        if (user.userInfo.username.replaceAll(" ", "").toLowerCase() === document.querySelector(".username").value.replaceAll(" ", "").toLowerCase()) {
            usernameTaken = true
        }
    })

    if (usernameTaken) {
        alert("Username is already taken, try a different one.")
    } else {
        userData = await getUserData()

        userData.userInfo.name = document.querySelector(".name").value !== "" ? document.querySelector(".name").value : userData.userInfo.name 
        userData.userInfo.username = document.querySelector(".username").value !== "" ? document.querySelector(".username").value : userData.userInfo.username

        document.querySelector(".name").placeholder = userData.userInfo.name
        document.querySelector(".name").value = ""
        document.querySelector(".username").placeholder = userData.userInfo.username
        document.querySelector(".username").value = ""

        setUserData(userData)

        localStorage.accessible = document.querySelector(".accessability").checked
    }
}