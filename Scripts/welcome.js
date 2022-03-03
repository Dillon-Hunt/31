window.onload = () => {
    if (localStorage.getItem("account")) {
        window.location.href = "./index.html"
    }
}

document.querySelector(".sign-up-button").onclick = () => {
    if (localStorage.getItem("account")) {
        window.location.href = "./index.html"
    } else {
        document.querySelector(".sign-up").style.display = "block"
        document.querySelector(".welcome-content").classList.add("blur")
    }
}

document.querySelector(".submit").onclick = () => {
    localStorage.setItem("account", JSON.stringify({
        name: document.querySelector(".name").value === "" ? "Player" : document.querySelector(".name").value,
        username: document.querySelector(".username").value === "" ? "Player" : document.querySelector(".username").value,
        accessible: document.querySelector(".accessability").checked,
        level: 0,
        points: 0,
    }))
    window.location.href = "./tutorial.html"
}