async function signUp(email, password, userData) {
    return new Promise((resolve) => {
        firebase.auth().createUserWithEmailAndPassword(
            email,
            password,
        )
        .then((user) => {
            var userId = user.user.uid
            localStorage.setItem("userId", userId)
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)

            firebase.firestore().collection("Users").doc(userId).set(userData).then(() => {
                resolve()
            })
        })
        .catch((error) =>  {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }

            waiting = false
            document.querySelector(".submit").style.opacity = 1
        });
    })
}

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (user) => {
        var userId = user.user.uid
        localStorage.setItem("userId", userId)
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)

        // Logged In
        window.location.href = "./index.html"
    })
    .catch((error) =>  {
        // Handle Errors here.
        alert(error.message)
    });
}