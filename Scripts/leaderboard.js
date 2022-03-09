async function createLeaderboard() {
    var allUserData = await getAllUsers()
    allUserData.sort((a, b) => {
        return b.points - a.points
    })

    var index = 1

    allUserData.forEach(user => {
        element = document.createElement("div")
        element.classList.add("leaderboard-item")
        element.classList.add("color1")
        element.innerHTML = (`
            <p class="leaderboard-username"><strong>${index}.</strong> ${user.username}</p>
            <p class="leaderboard-points">${numberWithCommas(user.points)}<p>
        `)
        document.querySelector(".leaderboard-section").appendChild(element)
        index++
    })
}

async function getAllUsers() {
    const snapshot = await firebase.firestore().collection('Users').get()
    return snapshot.docs.map(doc => {
        const data = doc.data()
        return {
            username: data.userInfo.username,
            points: data.stats.points
        }
    })
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}