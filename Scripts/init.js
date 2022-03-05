(function () {
    if (localStorage.userId === undefined) {
        window.location.href = "./welcome.html"
    } else {
        updateTheme()

        const game = new Game({
            element: document.querySelector(".game-container")
        })

        game.init()
    }

})();