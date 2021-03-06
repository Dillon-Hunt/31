class Game {
      constructor (config) {
       this.element = config.element
       this.cardCount = config.cardCount || 4
       this.playerCards = []
       this.opponentCards = []
       this.turn = "player"
       this.foods = getFoods()
       this.analytics = firebase.analytics();
       this.accessible = localStorage.accessible || false
    }

    async startGame() {
        this.userData = await getUserData()
        if (this.userData.achievements.reachLevel === undefined) {
            this.userData.achievements.reachLevel = {
                name: "Master of Points",
                level: 0,
                goal: 5,
                increment: 5,
                value: 0,
                text: "Congratulations, you reached level {GOAL}.",
                nextText: "Reach level {GOAL} to unlock the next achievement.",
            }
        }
        if (this.userData.achievements.playGames == undefined) {
            this.userData.achievements.playGames = {
                name: "Legend",
                level: 0,
                goal: 25,
                increment: 25,
                value: 0,
                text: "Awesome, you played {GOAL} games against the computer.",
                nextText: "Play a total of {GOAL} games against the computer.",
                image: "Achievement-3"
            }
        }
        document.querySelector(".loading").style.display = "none"
        this.analytics.setUserProperties({ level: this.userData.stats.level })
        this.analytics.logEvent("start_game")

        for (var i = 0; i < this.cardCount; i++) {
            this.playerCards[i] = new Card({
                card: this.deck.drawCard(),
                isPlayer: true,
                accessible: this.accessible,
            })

            this.playerCards[i].init(document.querySelector(".player-hand"))

            this.opponentCards[i] = new Card({
                card: this.deck.drawCard(),
                isPlayer: false,
            })

            this.opponentCards[i].init(document.querySelector(".opponent-hand"))
        }

        document.querySelector(".retry").onclick = () => {
            window.location.reload() // Start New Game Here
        }

        document.querySelector(".restart-button").onclick = () => {
            this.analytics.logEvent("new_game")
            window.location.reload() // Start New Game Here
        }

        document.querySelector(".give-up").onclick = () => {
            window.location.href = "./index.html" // Direct To Menu Screen
            // Teacher can set variables like changing the goal and card values to make it harder or easier to count your score
        }

        document.querySelector(".exit-button").onclick = () => {
            window.location.href = "./index.html" // Direct To Menu Screen
            // Teacher can set variables like changing the goal and card values to make it harder or easier to count your score
        }

        // Show help menu
        document.querySelector(".help-button").onclick = () => {
            document.querySelector(".help").style.display = "block"
        }

        document.querySelector(".help-exit-button").onclick = () => {
            document.querySelector(".help").style.display = "none"
        }

        this.turnCycle = new TurnCycle({
            game: this
        })
        this.turnCycle.init()
    }

    async init() {
        this.deck = new Deck({
            accessible: this.accessible,
        })
        this.deck.init(document.querySelector(".deck"))
        this.startGame()
    }
}