async function authUser() {
    return new Promise((resolve) => {
        if (!localStorage.email || !localStorage.email) {
            if (localStorage.userId) {
                localStorage.removeItem("userId")
            }
            window.location.href = "./welcome.html"
            resolve("Error")
        }

        firebase.auth().signInWithEmailAndPassword(localStorage.email, localStorage.password)
        .then(async (user) => {
            userId = user.user.uid
            localStorage.userId = userId

            // Logged In
            userData = await getUserData()
            resolve(userData)
        })
        .catch(error => {
            console.log(error)
            localStorage.removeItem("userId")
            localStorage.removeItem("email")
            localStorage.removeItem("password")
            window.location.href = "./welcome.html"

            resolve("Error")
        })
    })
}

async function getUserData() {
    return new Promise((resolve) => {
        firebase.firestore().collection("Users").doc(localStorage.getItem("userId")).get().then((doc) => {
            if (doc) {
                resolve(doc.data())
            }
        }).catch((error) => {
            window.location.href = "./welcome.html"
        })
    })
}

function setUserData(userData) {
    firebase.firestore().collection("Users").doc(localStorage.getItem("userId")).set(userData)
}