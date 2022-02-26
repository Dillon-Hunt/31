class Game {
    constructor(config) {
       this.element = config.element
       this.cardCount = config.cardCount || 4
       this.playerCards = []
       this.opponentCards = []
       this.turn = "player"
       this.playerData = JSON.parse(localStorage.getItem("account") || {})
       this.accessible = this.playerData.accessible || false
    }

    startGame() {
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

    init() {
        this.deck = new Deck({
            accessible: this.accessible,
        })
        this.deck.init(document.querySelector(".deck"))
        this.startGame()
    }
}