window.onload = () => {
    document.querySelectorAll(".play").forEach(button => {
        button.onclick = () => {
            window.location.href = "./computer.html"
        }
    })
}