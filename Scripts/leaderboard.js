async function createLeaderboard() {
    var allUserData = await getAllUsers()
    allUserData.sort((a, b) => {
        return b.points - a.points
    })

    var index = 1

    currentUserUsername = await firebase.firestore().collection("Users").doc(localStorage.getItem("userId")).get().then((doc) => {
        const data = doc.data()
        return data.userInfo.username
    })

    allUserData.forEach(user => {
        element = document.createElement("div")
        element.classList.add("leaderboard-item")
        if (currentUserUsername === user.username) {
            element.classList.add("color4")
        } else {
            element.classList.add("color1")
        }
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