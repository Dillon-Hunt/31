async function signUp(email, password, userData) {
    firebase.auth().createUserWithEmailAndPassword(
        email,
        password,
    )
    .then((user) => {
        userId = user.user.uid
        localStorage.userId = userId
        localStorage.email = email
        localStorage.password = password

        userRef = firebase.firestore().collection("Users").doc(userId).set(userData)

        return 200
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

        console.log(error);
    });
}

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (user) => {
        userId = user.user.uid
        localStorage.userId = userId
        localStorage.email = email
        localStorage.password = password

        // Logged In
        window.location.href = "./index.html"
    })
    .catch((error) =>  {
        // Handle Errors here.
        alert(error.message)
    });
}