window.onload = () => {
    if (localStorage.userId && localStorage.email && localStorage.password) {
        window.location.href = "./index.html"
    } else {
        const analytics = firebase.analytics();
        analytics.logEvent("welcome")
    }
}

document.querySelector(".sign-up-button").onclick = () => {
    document.querySelector(".sign-up").style.display = "block"
    document.querySelector(".welcome-content").classList.add("blur")
}

document.querySelector(".sign-up-close").onclick = () => {
    document.querySelector(".sign-up").style.display = "none"
    document.querySelector(".welcome-content").classList.remove("blur")
}

document.querySelector(".sign-in-button").onclick = () => {
    document.querySelector(".sign-in").style.display = "block"
    document.querySelector(".welcome-content").classList.add("blur")
}

document.querySelector(".sign-in-close").onclick = () => {
    document.querySelector(".sign-in").style.display = "none"
    document.querySelector(".welcome-content").classList.remove("blur")
}

document.querySelector(".sign-in-submit").onclick = () => {
    const analytics = firebase.analytics();
    analytics.logEvent("signin")
    signIn(document.querySelector(".sign-in-email").value, document.querySelector(".sign-in-password").value)
}

document.querySelector(".submit").onclick = async () => {
    const analytics = firebase.analytics();
    analytics.logEvent("signup")
    
    if (document.querySelector(".email").value !== "" && document.querySelector(".password").value !== "") {
        userData = {
            userInfo: {
                name: document.querySelector(".name").value,
                username: document.querySelector(".username").value,
            },

            stats: {
                level: 0,
                points: 0,
                games: 0,
                wins: 0,
                ties: 0,
                losses: 0,
                streak: 0,
                averageWin: 0,
                fastestWin: 0,
                averageLoss: 0,
                fastestLoss: 0,
            },

            foods: {
                apple: 0,
                orange: 0,
                banana: 0,
                carrot: 0,
                pineapple: 0,
                strawberry: 0,
                lemon: 0,
                tomato: 0,
                pear: 0,
                watermelon: 0,
                kiwifruit: 0,
                pumpkin: 0,
                chili: 0,
                cherry: 0,
                avocado: 0,
                mushroom: 0,
                toast: 0,
                waffle: 0,
                pretzel: 0,
                taco: 0,
                muffin: 0,
                pancakes: 0,
                cake: 0,
                icecream: 0,
                bacon: 0
            }, 

            achievements: {
                signUp: true,
                tutorial: false,
                firstGame: false,
            }
        }
        await signUp(document.querySelector(".email").value, document.querySelector(".password").value, userData)
        localStorage.accessible = document.querySelector(".accessability").checked
        window.location.href = "./tutorial.html"
    }
}