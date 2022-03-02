function updateTheme() {
    if (localStorage.getItem("theme") === null) {
        localStorage.setItem("theme", JSON.stringify({
            color1: "#2B2F44",
            color2: "#424d81",
            color3: "#3D4260",
            color4: "#8D55D6",
            color5: "#379CB3",
            color6: "#fff",
            border1: "2px solid #464D6C"
        }))
    }
    theme = JSON.parse(localStorage.getItem("theme"))

    if (document.querySelector(".color1")) {
        document.querySelectorAll(".color1").forEach(element => {
            element.style.background = theme.color1
        })
    }
    
    if (document.querySelector(".color2")) {
        document.querySelectorAll(".color2").forEach(element => {
            element.style.background = theme.color2
        })
    }

    if (document.querySelector(".color3")) {
        document.querySelectorAll(".color3").forEach(element => {
            element.style.background = theme.color3
        })
    }

    if (document.querySelector(".color4")) {
        document.querySelectorAll(".color4").forEach(element => {
            element.style.background = theme.color4
        })
    }

    if (document.querySelector(".color5")) {
        document.querySelectorAll(".color5").forEach(element => {
            element.style.border = theme.color5
        })
    }

    document.body.style.color = theme.color6

    if (document.querySelector(".border1")) {
        document.querySelectorAll(".border1").forEach(element => {
            element.style.border = theme.border1
        })
    }
}
