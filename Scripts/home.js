window.onload = () => {
    updateTheme()
    if (!localStorage.getItem("account")) {
        window.location.href = "./welcome.html"
    } else {
        playerData = JSON.parse(localStorage.getItem("account") || {})
        document.querySelector(".player-stats").textContent = playerData.name + "'s Stats" || "No Data" 

        document.querySelector(".level-text").textContent = "Level " + (playerData.level || 0)
        document.querySelector(".level-subtext").textContent = (500 - ((playerData.points || 0) % 500)) + " Points Until Next Level"
        document.querySelector(".level-progress").style.width = (((playerData.points || 0) % 500) / 500 * 100) + "%"

        // Fake data at the moment
        document.querySelector(".score-text").textContent = "Score " + 525
        document.querySelector(".score-subtext").textContent = "Win " + 5 + " more games to increase your score"
        document.querySelector(".score-progress").style.width = "50%" // To Do: Create score

        document.querySelector(".wl-text").textContent = "Win : Tie : Loss"
        document.querySelector(".wl-subtext").textContent = "Ratio " + (playerData.wins || 0) + " : " + (playerData.ties || 0) + " : " + (playerData.losses || 0)
        document.querySelector(".win-progress").style.width = playerData.wins ? (playerData.wins / playerData.games * 100) + "%" : "0%"
        document.querySelector(".tie-progress").style.width = playerData.ties ? (playerData.ties / playerData.games * 100) + "%" : "0%"

        document.querySelector(".games").textContent = playerData.games || "0"
        document.querySelector(".fastest-win").textContent = playerData.fastestWin !== undefined ? (playerData.fastestWin + (playerData.fastestWin === 1 ? " Turn" : " Turns")) : "No Data"
        document.querySelector(".average-win").textContent = playerData.averageWin !== undefined ? (Math.floor(playerData.averageWin) + (Math.floor(playerData.averageWin) === 1 ? "Turn" : " Turns")) : "No Data" // Change to average win
        document.querySelector(".fastest-loss").textContent = playerData.fastestLoss !== undefined ? (playerData.fastestLoss + (playerData.fastestLoss === 1 ? " Turn" : " Turns")) :  "No Data"
        document.querySelector(".average-loss").textContent = playerData.averageLoss !== undefined ? (Math.floor(playerData.averageLoss) + (Math.floor(playerData.averageLoss) === 1 ? " Turn" : " Turns")) :  "No Data"
    
        document.querySelector(".name").placeholder = playerData.name
        document.querySelector(".username").placeholder = playerData.username
        document.querySelector(".accessability").checked = playerData.accessible ? 1 : 0

            /* 
        if (playerData.games && playerData.games > 9) {
            // Calculate player score
            var playerScore = 0
            playerScore += (playerData.wins || 0) / (playerData.losses || 1) * 1000
            playerScore += playerData.games * (playerData.averageLoss || 0)
            playerScore -= playerData.games * (playerData.averageWin || 0)
            playerScore += 500 - (playerData.fastestWin * 20)
            playerScore -= 500 - (playerData.fastestLoss * 20)
            document.querySelector(".score").textContent = Math.floor(playerScore)
        } else {
            document.querySelector(".score").textContent = "Play at least 10 games"
        }
        */

        // Destroy playerData variable to stop cheating
        delete window.playerData
    }
}

document.querySelectorAll(".play-button").forEach(button => {
    button.onclick = () => {
        if (localStorage.getItem("account")) {
            window.location.href = "./computer.html"
        } else {
            window.location.href = "./welcome.html"
        }
    }
})

document.querySelector(".back-button").onclick = () => {
    document.querySelector(".collectables").style.display = "none"
}

document.querySelector(".collectables-button").onclick = () => {
    document.querySelector(".collectables").style.display = "block"
}


document.querySelector(".save-button").onclick = () => {
    playerData = JSON.parse(localStorage.getItem("account") || {})

    playerData.name = document.querySelector(".name").value !== "" ? document.querySelector(".name").value : playerData.name 
    playerData.username = document.querySelector(".username").value !== "" ? document.querySelector(".username").value : playerData.username
    playerData.accessible = document.querySelector(".accessability").checked
    localStorage.setItem("account", JSON.stringify(playerData))
    window.location.href = "./index.html"
}