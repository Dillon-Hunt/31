window.onload = () => {
    document.querySelectorAll(".play").forEach(button => {
        button.onclick = () => {
            window.location.href = "./computer.html"
        }
    })
    const analytics = firebase.analytics();
    analytics.logEvent("tutorial")
}