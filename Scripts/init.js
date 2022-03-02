(function () {
    updateTheme()
    if (localStorage.getItem("account")) {
        const game = new Game({
            element: document.querySelector(".game-container")
        })

        game.init()
    } else {
        window.location.href = "./welcome.html"
    }

})();