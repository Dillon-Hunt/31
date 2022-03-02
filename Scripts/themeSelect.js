document.querySelector(".blue").onclick = () => {
    localStorage.setItem("theme", JSON.stringify({
        color1: "#2B2F44",
        color2: "#3D4260",
        color3: "#3D4260",
        color4: "#8D55D6",
        color5: "#379CB3",
        color6: "#fff",
        border1: "2px solid #464D6C"
    }))
    updateTheme()
}

document.querySelector(".light-blue").onclick = () => {
    localStorage.setItem("theme", JSON.stringify({
        color1: "#6D80E3",
        color2: "#5C6DC5",
        color3: "#3D4260",
        color4: "#532c86",
        color5: "#9BECFF",
        color6: "#fff",
        border1: "2px solid #464D6C"
    }))
    updateTheme()
}

document.querySelector(".red").onclick = () => {
    localStorage.setItem("theme", JSON.stringify({
        color1: "#641919",
        color2: "#8C3131",
        color3: "#3D4260",
        color4: "#8D55D6",
        color5: "#379CB3",
        color6: "#fff",
        border1: "2px solid #4F0707"
    }))
    updateTheme()
}

document.querySelector(".light-red").onclick = () => {
    localStorage.setItem("theme", JSON.stringify({
        color1: "#FF9393",
        color2: "#FF7D7D",
        color3: "#3D4260",
        color4: "#532c86",
        color5: "#9BECFF",
        color6: "#000",
        border1: "2px solid #4F0707"
    }))
    updateTheme()
}