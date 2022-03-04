class TurnCycle {
    constructor(config) {
        this.game = config.game
        this.goal = config.goal || 31
        this.currentTeam = "player"
        this.opponentHandValues = null
        this.turns = 0
    }

    async getNewCard(selection) {
        this.selection = selection || null
        var card = null

        if (this.selection) {
            // Computer Draws
            this.selection -= 1
            
            if (this.selection === 0) {
                card = this.game.opponentCards[4] = new Card({ // Change to be dynamic
                    card: this.game.deck.drawCard(),
                    isPlayer: false,
                })
            } else {
                card = this.game.opponentCards[4] = new Card({ // Change to be dynamic
                    card: this.game.deck.prevCards[this.game.deck.prevCards.length - 1],
                    isPlayer: false,
                })
                this.game.deck.prevCards.splice(this.game.deck.prevCards.length - 1, 1)
                this.game.deck.updateDiscard()
            }
        } else {
            // Player Draws
            await new Promise(resolve => {
                this.checkListenersDraw(resolve)
            })
    
            if (this.selection === "deck") {
                card = this.game.playerCards[4] = new Card({ // Change to be dynamic
                    card: this.game.deck.drawCard(),
                    isPlayer: true,
                })
            } else {
                card = this.game.playerCards[4] = new Card( {// Change to be dynamic
                    card: this.game.deck.prevCards[this.game.deck.prevCards.length - 1],
                    isPlayer: true,
                })
                this.game.deck.prevCards.splice(this.game.deck.prevCards.length - 1, 1)
                this.game.deck.updateDiscard()
            }
        }
        

        return card
    }

    checkListenersDraw(resolve) {
        // Add listener to see where the player want's to draw from

        // Add a listener to the deck to check if players selects the deck
        this.deckListener = new CardClickListener(document.querySelector(".deck-card-outer"), () => {
            this.selection = "deck"
            this.deckListener.unbind()
            this.discardListener.unbind()
            resolve()

        })

        // Add listener to the dicard pile to check if player selects the discard pile
        this.discardListener = new CardClickListener(document.querySelector(".deck-card-outer-prev"), () => {
            this.selection = "discard"
            this.deckListener.unbind()
            this.discardListener.unbind()
            resolve()
        })
    }

    async discard(selection) {
        this.selection = selection || null

        if (this.selection) {
            // Computer Discards
            this.selection -= 1

            // Find the card and remove it from their hand
            var card = this.game.opponentCards[this.selection]
            this.game.opponentCards[this.selection].removeCard()
            this.game.opponentCards.splice(this.selection, 1)

            // Update the discard pile to display the new top card
            this.game.deck.updateDiscard(card.card)
        } else { 
            // Player Discards

            // Wait for player to chose a card to discard
            await new Promise(resolve => {
                this.checkListenersDiscard(resolve)
            })

            // Find the card and remove it from their hand
            var card = this.game.playerCards[this.selection]
            this.game.playerCards[this.selection].removeCard()
            this.game.playerCards.splice(this.selection, 1)

            // Update the discard pile to display the new top card
            this.game.deck.updateDiscard(card.card)
        }
    }

    unbindAllDiscard() {
        // unbind the event listeners form the players cards
        this.card1Listener.unbind()
        this.card2Listener.unbind()
        this.card3Listener.unbind()
        this.card4Listener.unbind() // Change to be dynamic
    }

    checkListenersDiscard(resolve) { // Change to be dynamic - Perhaps use an aray of listeners like the cards
        // Add an event listener to the first card
        this.card0Listener = new CardClickListener(document.getElementsByClassName("player-card-outer")[0], () => {
            this.selection = 0
            this.unbindAllDiscard()
            resolve()
        })

        // Add an event listener to the second card
        this.card1Listener = new CardClickListener(document.getElementsByClassName("player-card-outer")[1], () => {
            this.selection = 1
            this.unbindAllDiscard()
            resolve()
        })
        // Add an event listener to the third card
        this.card2Listener = new CardClickListener(document.getElementsByClassName("player-card-outer")[2], () => {
            this.selection = 2
            this.unbindAllDiscard()
            resolve()
        })

        // Add an event listener to the fourth card
        this.card3Listener = new CardClickListener(document.getElementsByClassName("player-card-outer")[3], () => {
            this.selection = 3
            this.unbindAllDiscard()
            resolve()
        })

        // Add an event listener to the fifth card
        this.card4Listener = new CardClickListener(document.getElementsByClassName("player-card-outer")[4], () => {
            this.selection = 4
            this.unbindAllDiscard()
            resolve()
        })
    }

    getAllScores(values) {
        if (values.length == 1) {
            // If the current values only contains 1 value just return it
            return values[0]
        } else {
            var scores = []

            // Get next case
            var otherCases = this.getAllScores(values.slice(1))

            for (var i = 0; i < otherCases.length; i++) {
                // For each case add to all other values
                for (var j = 0; j < values[0].length; j++) {
                    // Push values to scores
                    scores.push(values[0][j] + otherCases[i])
                }
            }

            // Return added scores
            return scores
        }
    }

    checkForWinner() {
        var winner = null
    
        var playerValues = [] 
        var opponentValues = []

        // Construct the playerValues & opponentValues by organising by suits
        for (i = 0; i < this.game.deck.suits.length; i++) {
            playerValues[i] = {
                suit: this.game.deck.suits[i],
                cards: [],
                values:  []
            }
            opponentValues[i] = {
                suit: this.game.deck.suits[i],
                cards: [],
                values:  []
            }
        }

        // loop through the suits and push the cards to playerValues
        for (var i = 0; i < this.game.deck.suits.length; i++) {
            this.game.playerCards.forEach(card => {
                if (card.card.suit === this.game.deck.suits[i].name) { 
                    playerValues[i].values.push(card.card.values)
                    playerValues[i].cards.push(card.card)
                }
            })
        }

        // loop through the suits and push the cards to opponentValues
        for (var i = 0; i < this.game.deck.suits.length; i++) {
            this.game.opponentCards.forEach(card => {
                if (card.card.suit === this.game.deck.suits[i].name) { 
                    opponentValues[i].values.push(card.card.values)
                    opponentValues[i].cards.push(card.card)
                }
            })
        }

        // If you want to display your score, prehaps on easy mode
        var playerScoresString = ""
        var opponentScoresString = ""


        // Checks if the player has 31
        for (var i = 0; i < this.game.deck.suits.length; i++) {
            if (playerValues[i].cards.length > 0) {
                const playerScores = this.getAllScores(playerValues[i].values)
                playerScores.forEach(score => {
                    playerScoresString += playerScoresString === "" ? score.toString() : ", " + score.toString()
                    if (score === this.goal) {
                        if (winner) {
                            // If there is already a winner, declare a tie
                            winner = "tie"
                        } else {
                            winner = "player"
                        }
                    }
                })
            }

            this.opponentHandValues = opponentValues

            // Checks if the opponent has 31
            if (opponentValues[i].cards.length > 0) {
                const opponentScores = this.getAllScores(opponentValues[i].values)
                opponentScores.forEach(score => {
                    opponentScoresString += opponentScoresString === "" ? score.toString() : ", " + score.toString()
                    if (score === this.goal) {
                        if (winner) {
                            // If there is already a winner, declare a tie
                            winner = "tie"
                        } else {
                            winner = "opponent"
                        }
                    }
                })
            }
        }

        /* Calculates Score
        document.querySelector(".player-score").textContent = "Score(s): " + playerScoresString
        document.querySelector(".opponent-score").textContent = "Score(s): " + opponentScoresString 
        */

        if (winner && this.turns === 0) {
            // Case: someone won by luck of the delay

            // Reload the page and stop execution
            window.location.reload()
        } else {
            return winner
        }
    }

    checkForDefaultWinner() {
        // Same as checkForWinner but returns the closest to 31 instead, only called if deck runs out

        var winner = null
        var player = null
        var opponent = null
    
        var playerValues = [] 
        var opponentValues = []

        for (i = 0; i < this.game.deck.suits.length; i++) {
            playerValues[i] = {
                suit: this.game.deck.suits[i],
                cards: [],
                values:  []
            }
            opponentValues[i] = {
                suit: this.game.deck.suits[i],
                cards: [],
                values:  []
            }
        }

        for (var i = 0; i < this.game.deck.suits.length; i++) {
            this.game.playerCards.forEach(card => {
                if (card.card.suit === this.game.deck.suits[i].name) { 
                    playerValues[i].values.push(card.card.values)
                    playerValues[i].cards.push(card.card)
                }
            })
        }

        for (var i = 0; i < this.game.deck.suits.length; i++) {
            this.game.opponentCards.forEach(card => {
                if (card.card.suit === this.game.deck.suits[i].name) { 
                    opponentValues[i].values.push(card.card.values)
                    opponentValues[i].cards.push(card.card)
                }
            })
        }

        var playerScoresString = ""
        var opponentScoresString = ""

        for (var i = 0; i < this.game.deck.suits.length; i++) {
            if (playerValues[i].cards.length > 0) {
                const playerScores = this.getAllScores(playerValues[i].values)
                playerScores.forEach(score => {
                    playerScoresString += playerScoresString === "" ? score.toString() : ", " + score.toString()
                    if (score > player && score < 32) {
                        player = score
                    }
                })
            }

            this.opponentHandValues = opponentValues

            if (opponentValues[i].cards.length > 0) {
                const opponentScores = this.getAllScores(opponentValues[i].values)
                opponentScores.forEach(score => {
                    opponentScoresString += opponentScoresString === "" ? score.toString() : ", " + score.toString()
                    if (score > opponent && score < 32) {
                        opponent = score
                    }
                })
            }
        }

        if (opponent > player) {
            winner = "opponent"
        } else if (player > opponent) {
            winner = "player"
        } else {
            winner = "tie"
        }

        document.querySelector(".player-score").textContent = "Score(s): " + playerScoresString
        document.querySelector(".opponent-score").textContent = "Score(s): " + opponentScoresString

        return winner
    }

    async wait(delay) { 
        // Pauses for delay milliseconds
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, delay)
        })
    }

    gameOver() {
        document.querySelector(".player-hand").classList.add("end")
        document.querySelector(".opponent-hand").classList.add("end")
        document.querySelector(".deck").classList.add("end")

        if (!this.winner) {
            // Case: the deck ran out
            this.winner = this.checkForDefaultWinner()
        }

        if (this.winner === "player") {
            // Case: there is a winner and it is the player
            this.points += 100

            document.querySelector(".reward").style.display = "block"

            var foodsArray = [];

            for(var i = 0; i < this.game.foods.length; i++) {
                // Run through all foods

                for(var x = 0; x < this.game.foods[i].weight; x++) {
                    // Run through all food weights

                    // Add food to foodsArray
                    foodsArray.push(this.game.foods[i]);
                }
            }

            // Pick a weighted random food
            var index = Math.floor(Math.random() * foodsArray.length);
            var randomFood = foodsArray[index];

            this.game.userData.foods[randomFood.name.toLowerCase().replaceAll(" ", "")] += 1
            
            document.querySelector(".open-button").onclick = () => {
                document.querySelector(".open-button").style.display = "none"
                document.querySelector(".closed").style.display = "none"
                document.querySelectorAll(".open").forEach(element => {
                    element.style.display = "block"
                })
                document.querySelector(".reward").classList.add("received")
                if (randomFood.tier === "common") {
                    document.querySelector(".reward").style.backgroundColor = "#4271ff"
                } else if (randomFood.tier === "uncommon") {
                    document.querySelector(".reward").style.backgroundColor = "#ff424b"
                } else if (randomFood.tier === "rare") {
                    document.querySelector(".reward").style.backgroundColor = "#ff9242"
                } else if (randomFood.tier === "legendary") {
                    document.querySelector(".reward").style.backgroundColor = "#dec209"
                } else if (randomFood.tier === "epic") {
                    document.querySelector(".reward").style.backgroundColor = JSON.parse(localStorage.getItem("theme")).color4
                }
                document.querySelector(".fruit").style.animation = "rise 1s ease-in-out"
                document.querySelector(".fruit").src = `./images/${randomFood.name.toLowerCase()}.png`
                setTimeout(() => {
                    document.querySelector(".fruit").style.animation = ""
                    document.querySelector(".fruit").style.top = "90px"
                    document.querySelector(".reward").classList.remove("received")
                    document.querySelectorAll(".chest").forEach(chest => {
                        chest.style.transition = "0.2s"
                        chest.style.opacity = "0"
                    })
                    setTimeout(() => {
                        document.querySelector(".found-message-tier").textContent = randomFood.tier
                        document.querySelector(".found-message-tier").style.display = "block"
                        document.querySelector(".found-message").textContent = this.game.userData.userInfo.username + " found a " + randomFood.name + "."
                        document.querySelector(".found-message").style.display = "block"
                    }, 200)
                }, 1000)
            }

            document.querySelector(".next-button").onclick = () => {
                document.querySelector(".reward").classList.remove("received")
                document.querySelector(".reward").style.display = "none"
            }

            // Update DOM
            document.querySelector(".game-over").classList.add("victory")
            document.querySelector(".game-over-title").textContent = this.game.userData.userInfo.username + " Wins"
            document.querySelector(".game-over-subtitle").textContent = "The Computer cowers in the shame of it's defeat."

            // Add new data to userData
            this.game.userData.stats.wins += 1
            this.game.userData.stats.averageWin = this.game.userData.stats.averageWin !== 0 ? (this.game.userData.stats.averageWin + this.turns) / 2 : this.turns
            this.game.userData.stats.fastestWin = this.game.userData.stats.fastestWin !== 0 ? (this.game.userData.stats.fastestWin < this.turns ? this.game.userData.stats.fastestWin : this.turns) : this.turns
        } else if (this.winner === "opponent") {
            // Case: there is a winner and it is the opponent
            this.points += 25

            // Update DOM
            document.querySelector(".game-over").classList.add("bust")
            document.querySelector(".game-over-title").textContent = "Computer Wins"
            document.querySelector(".game-over-subtitle").textContent = "Ha, You just got beaten by the Computer."

            // Add new data to userData
            this.game.userData.stats.losses += 1
            this.game.userData.stats.averageLoss = this.game.userData.stats.averageLoss !== 0 ? (this.game.userData.stats.averageLoss + this.turns) / 2 : this.turns
            this.game.userData.stats.fastestLoss = this.game.userData.stats.fastestLoss !== 0 ? (this.game.userData.stats.fastestLoss < this.turns ? this.game.userData.stats.fastestLoss : this.turns) : this.turns
        } else if (this.winner === "tie") {
            // Case: there is a winner and it is a tie
            this.points += 50

            // Update DOM
            document.querySelector(".game-over").classList.add("tie")
            document.querySelector(".game-over-title").textContent = "Tie"
            document.querySelector(".game-over-subtitle").textContent = "Wait, how is that even possible? What a scam!"

            // Add new data to userData
            this.game.userData.stats.ties += 1
        }

        // Update and reveal all opponentCards
        this.game.opponentCards.forEach(card => {
            card.update(card.card, true)
        })

        // Add new data to userData and save
        this.game.userData.stats.games += 1
        setUserData(this.game.userData)

        // Update points & level
        this.updatePoints(true)
    }

    updatePoints(gameOver) {
        // Update points & level
        this.points = this.points || (this.game.userData.stats.points || 0)

        if (this.points > (this.game.userData.stats.points || 0)) {
            // Case: gained points
            document.querySelector(".points-up").textContent = "+" + (this.points - this.game.userData.stats.points)
            this.game.userData.stats.points = this.points
            document.querySelector(".points-up").style.display = "block"

            setTimeout(() => {
                document.querySelector(".points-up").style.display = "none"
            }, 5000)
        }

        var level = Math.floor((this.game.userData.stats.points || 0) / 500) // Will change to be exponentially harder

        if (level > (this.game.userData.stats.level || 0)) {
            // Case: level up

            if (gameOver) {
                document.querySelector(".next-button-0").onclick = () => {
                    document.querySelector(".level-up-section").style.display = "none"
                }
    
                document.querySelector(".level-up-section").style.display = "block"
                document.querySelector(".level-up-message").textContent = "LEVEL UP"
                document.querySelector(".level-up-level").textContent = level
            }
            this.game.userData.stats.level = level
            document.querySelector(".level-up").style.display = "block"

            setTimeout(() => {
                document.querySelector(".level-up").style.display = "none"
            }, 5000)
        }

        document.querySelector(".level-value").textContent = this.game.userData.stats.level
        document.querySelector(".points-value").textContent = this.game.userData.stats.points

        setUserData(this.game.userData)

    }

    async turn() {
        // Update points & level
        this.updatePoints(false)

        // Check if there is a winner
        this.winner = this.checkForWinner()


        if (this.winner || this.game.deck.deck.length === 0) {
            // Case: someone won OR the deck ran out

            // End the game
            this.gameOver()
            
        } else {
            // Case: Resume Next Turn
            if (this.currentTeam === "player") {
                // Case: Player's Turn

                // Add 1 to the turn counter
                this.turns ++

                //Accessability
                this.game.accessible && (document.querySelector(".deck-card-outer-prev").tabIndex = 0)
                this.game.accessible && (document.querySelector(".deck-card-outer-prev").setAttribute("role", "button"))
                this.game.accessible && (document.querySelector(".deck-card-outer").tabIndex = 0)
                this.game.accessible && (document.querySelector(".deck-card-outer").setAttribute("role", "button"))

                // Animations
                setTimeout(() => {
                    document.querySelector(".deck-card-outer-prev").classList.add("selectable")
                    document.querySelector(".deck-card-outer").classList.add("selectable")
                }, 300)
                if (this.turns > 1) {
                    document.querySelector(".deck-card-outer-prev").classList.remove("not-selectable")
                    document.querySelector(".deck-card-outer").classList.remove("not-selectable")
                } else {
                    document.querySelectorAll(".player-card-outer").forEach(card => {
                        card.classList.add("not-selectable")
                })
                }

                // Wait for the player to draw
                const card = await this.getNewCard() 

                // initialize the card
                card.init(document.querySelector(".player-hand"))

                //Accessability Settings
                this.game.accessible && (document.querySelector(".deck-card-outer-prev").tabIndex = -1)
                this.game.accessible && (document.querySelector(".deck-card-outer-prev").setAttribute("role", "section"))
                this.game.accessible && (document.querySelector(".deck-card-outer").tabIndex = -1)
                this.game.accessible && (document.querySelector(".deck-card-outer").setAttribute("role", "section"))


                // Animations
                document.querySelector(".deck-card-outer-prev").classList.add("not-selectable")
                document.querySelector(".deck-card-outer").classList.add("not-selectable")
                document.querySelector(".deck-card-outer-prev").classList.remove("selectable")
                document.querySelector(".deck-card-outer").classList.remove("selectable")
                document.querySelectorAll(".player-card-outer").forEach(card => {
                    card.classList.add("selectable")
                    card.classList.remove("not-selectable")
                })

                //Accessability Settings
                document.querySelectorAll(".player-card-outer").forEach(card => {
                    card.tabIndex = 0
                    card.setAttribute("role", "button")
                })

                // Wait for player to discard
                await this.discard()

                //Accessability Settings
                document.querySelectorAll(".player-card-outer").forEach(card => {
                    card.tabIndex = -1
                    card.setAttribute("role", "section")
                })
            } else {
                // Case: Computer's Turn

                // Animations
                document.querySelectorAll(".player-card-outer").forEach(card => {
                    card.classList.remove("selectable")
                    card.classList.add("not-selectable")
                })

                // Add a little delay so the player can process what is happening
                await this.wait(1000)

                var selection = 1
                var canWin = false
                var keepSuit = null // E.g. "Green"
                var keepSuits = [] // E.g. ["Green", "Purple"]
                var removeCard = null
                var isTriple = false
                var isQuadruple = false
                var removeSuits = []

                var doRandom = Math.floor(Math.random() * (this.game.userData.level || 0))

                if (doRandom === 0) {
                    selection = Math.floor(Math.random() * 2) + 1
                } else {
                // Check if it can make 31
                    this.opponentHandValues?.forEach(element => {
                        // Run through all elements (organized by suit) of the opponent's hand

                        if (element.values.length != 0) {
                            // Case: the suit contains at least 1 card with a value

                            // Calculate all the possible scores for the given suit
                            var elementValues = this.getAllScores(element.values)

                            elementValues.forEach(elementValue => {
                                // For each score check if it can be made into 31 by drawing from the discard pile

                                this.game.deck.prevCards[this.game.deck.prevCards.length - 1].values.forEach(discardValue => {
                                    // Run through all values that the top card of the discard pile has

                                    if (element.suit.name === this.game.deck.prevCards[this.game.deck.prevCards.length - 1].suit) {
                                        // Case: the suit of the top card is equal to the suit that is being checked

                                        if (elementValue + discardValue === 31 && element.cards.length < 4) {
                                            // Case it is possible to draw a card and discard from another suit to make 31

                                            // Identify the winning suit
                                            keepSuit = element.suit.name
                                            canWin = true

                                            // Select to draw from the discard pile
                                            selection = 2
                                        } else if (element.cards.length === 4) {
                                            // Case: the opponent has 4 cards of the given suit

                                            isQuadruple = true
                                            isTriple = true

                                            element.cards.forEach(card => {
                                                // Run through all cards in the players hand

                                                card.values.forEach(newCardValue => {
                                                    // Run through all values of the given cards

                                                    // Important:
                                                    // elementValue === the players current score
                                                    // discardValue === the card in the discard piles value
                                                    // newCardValue === the value of the potential card to get rid of

                                                    if (elementValue + discardValue - newCardValue === 31) {
                                                        // Case: can draw from the discard and then discard newCard in order to get 31

                                                        // Identify the card to remove to make 31
                                                        removeCard = card
                                                        canWin = true

                                                        // Select to draw from the discard pile
                                                        selection = 2
                                                    }
                                                })
                                            })
                                        }

                                        if (element.cards.length >= 1 && !isQuadruple && !isTriple && !canWin) {
                                            // Case: already has 2 cards of the suit so draw it to make it easier to get 31 on a future turn

                                            // Select to draw from the discard pile

                                            if (element.cards.length == 2) {
                                                keepSuits = [element.suit.name]
                                                isTriple = true
                                            } else {
                                                keepSuits.push(element.suit.name)
                                            }
                                            selection = 2

                                        }

                                    } else if (element.cards.length >= 2 && !isTriple && !isQuadruple) {
                                        // Case: already has 3 cards of the suit so draw it to make it easier to get 31 on a future turn

                                        // Add card to keepSuits
                                        if (element.cards.length === 3) {
                                            keepSuits = [element.suit.name]
                                            isTriple = true
                                            selection = 1
                                        } else {
                                            keepSuits.push(element.suit.name)
                                        }
                                    }

                                    if (element.cards.length === 4 && canWin === false) {
                                        // Case: the opponent has 4 cards of the given suit and can't win

                                        isQuadruple = true
                                        isTriple = true

                                        var closest = null // E.g. 3 -> (3 away from 31)

                                        if (elementValue > 31) {
                                            closest = elementValue - 31
                                        } else {
                                            closest = 31 - elementValue
                                        }

                                        element.cards.forEach(card => {
                                            // Run through all cards in the players hand

                                            card.values.forEach(newCardValue => {
                                                // Run through all values of the given cards

                                                // Important:
                                                // elementValue === the playes current score
                                                // discardValue === the card in the dicard piles value
                                                // newCardValue === the value of the potential card to get rid of

                                                if (element.suit.name === this.game.deck.prevCards[this.game.deck.prevCards.length - 1].suit) {
                                                    var newScore = elementValue + discardValue - newCardValue // E.g. 34 -> (3 away from 31)
                                                } else {
                                                    var newScore = elementValue - newCardValue // E.g. 34 -> (3 away from 31)
                                                }

                                                if (newScore > 31) {
                                                    // To Do: Comments
                                                    if (newScore - 31 < closest) {
                                                        closest = newScore > 31
                                                        removeCard = card
                                                        selection = 2
                                                        keepSuit = null
                                                    }
                                                } else {
                                                    if (31 - newScore < closest) {
                                                        closest = 31 - newScore
                                                        removeCard = card
                                                        selection = 2
                                                        keepSuit = null
                                                    }
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    })
                }

                // Get new card
                const card = await this.getNewCard(selection)

                // initialize the card in the opponent's hand
                card.init(document.querySelector(".opponent-hand"))

                // Select a random card to discard (Default Value)
                var selection = 0

                doRandom = Math.floor(Math.random() * (this.game.userData.level || 0))

                if (doRandom === 0) {
                    selection = Math.floor(Math.random() * this.game.opponentCards.length) + 1
                } else {
                // Decide which card to discard
                    if (isQuadruple && !canWin) {

                        // Check if it can make 31
                        this.opponentHandValues?.forEach(element => {
                            // Run through all elements (organized by suit) of the opponent's hand

                            if (element.values.length != 0) {
                                // Case: the suit contains at least 1 card with a value

                                // Calculate all the possible scores for the given suit
                                var elementValues = this.getAllScores(element.values)

                                elementValues.forEach(elementValue => { /// Change for removing card

                                    var closest = null // E.g. 3 -> (3 away from 31)
        
                                    if (elementValue > 31) {
                                        closest = elementValue - 31
                                    } else {
                                        closest = 31 - elementValue
                                    }

                                    element.cards.forEach(handCard => {
                                        // Run through all cards in the players hand

                                        handCard.values.forEach(newCardValue => {
                                            // Run through all values of the given cards

                                            // Important:
                                            // elementValue === the playes current score
                                            // newCardValue === the value of the potential card to get rid of

                                            var newScore = 0

                                            if (card.card.suit === handCard.suit) { // Make work with ace (1 - 11)
                                                newScore = elementValue - newCardValue + card.card.values[0] // E.g. 34 -> (3 away from 31)
                                            } else {
                                                newScore = elementValue - newCardValue // E.g. 34 -> (3 away from 31)
                                            }

                                            if (newScore > 31) {
                                                // To Do: Comments
                                                if (newScore - 31 < closest) {
                                                    closest = newScore > 31
                                                    removeCard = null
                                                    key = 1
                                                    this.game.opponentCards.forEach(opponentCard => {
                                                        if (opponentCard.card === handCard) {
                                                            selection = key
                                                        }
                                                        key ++
                                                    })
                                                    keepSuit = null
                                                }
                                            } else {
                                                if (31 - newScore < closest) {
                                                    closest = 31 - newScore
                                                    removeCard = null
                                                    key = 1
                                                    this.game.opponentCards.forEach(opponentCard => {
                                                        if (opponentCard.card === handCard) {
                                                            selection = key
                                                        }
                                                        key ++
                                                    })
                                                    keepSuit = null
                                                }
                                            }
                                        })
                                    })
                                })
                            }
                        })

                        if (selection === 0) {
                            selection = this.game.opponentCards.indexOf(card) + 1
                        }
                    } else {
                        Math.floor(Math.random() * this.game.deck.suits.length) + 1 // E.g. 5
                        if (!keepSuit && keepSuits.length === 0) {
                            // Case: a specific suit to keep hasn't been identified

                            var suits = [] // E.g. [0, 2, 1, 2]

                            for (var i = 0; i < this.game.deck.suits.length; i++) {
                                // Run through all suits

                                var numberOfSuit = 0

                                this.game.opponentCards.forEach(card => {
                                    // Run through all card in the opponent's hand

                                    if (card.card.suit === this.game.deck.suits[i].name) {
                                        // Case the suits match

                                        // Add to the suit count
                                        numberOfSuit++
                                    }
                                })

                                // Push numberOfSuit to suits
                                suits.push(numberOfSuit)
                            }

                            for (var j = 0; j < suits.length; j++) {
                                // Run through newly creates suit array

                                if (suits[j] < 3 && suits[j] != 0) { 
                                    // Case: there is less than 3 cards in the opponent's hand of the suit

                                    // Mark that suit as able to remove
                                    removeSuits.push(this.game.deck.suits[j])
                                }
                            }


                            // If computer cant get 4 of a kind, try to get 3
                            if (removeSuits.length === 4) {
                                // Case: all suits are marked as able to remove

                                for (var j = 0; j < suits.length; j++) {
                                    // Run through all suits
                                    if (suits[j] > 1 && suits[j] != 0) { 
                                        // Case: there is more than 1 card in the oponents hand of the suit

                                        // Remove suit from removeSuits
                                        removeSuits.slice(this.game.deck.suits[j], 1)
                                    }
                                }
                            }
                        }

                        // Check which card to discard
                        if (canWin) {
                            // Case: it is possible to win
                            if (removeCard) {
                                // Case: posible to win by replacing a card of the new card's suit

                                var key = 1
                                this.game.opponentCards.forEach(cardElement => {
                                    // Run through all cards

                                    if (cardElement.card === removeCard) {
                                        // Case: card is the removeCard

                                        // Select card
                                        selection = key
                                    }

                                    key++
                                })
                            } else {
                                // Case: win with new card's suit

                                // Get all cards with differnt suits
                                const validRemovals = this.game.opponentCards.filter(card => { return card.card.suit != keepSuit})

                                // Remove random card from validRemovals
                                selection =  this.game.opponentCards.indexOf(validRemovals[Math.floor(Math.random() * validRemovals.length)]) + 1
                            }
                        } else if (removeCard) {
                            // Case: get closer to 31 by replacing a card of the new card's suit

                            var key = 1
                            this.game.opponentCards.forEach(cardElement => {
                                // Run through all cards

                                if (cardElement.card === removeCard) {
                                    // Case: card is the removeCard

                                    // Select card
                                    selection = key
                                }

                                key++
                            })
                        } else if (removeSuits.length != 0) {
                            // Case: not possible to win

                            // Remove a random card from removeSuits
                            const suitIndex = Math.floor(Math.random() * removeSuits.length)
                            this.game.opponentCards.forEach(card => {
                                // Run through all opponentCards

                                if (card.card.suit === removeSuits[suitIndex].name) {
                                    // Case the card is from the removeSuit

                                    // Select card to be removes
                                    selection = this.game.opponentCards.indexOf(card) + 1
                                }
                            })
                        } else if (keepSuits.length > 0) {
                            // Case: there is a keep suit

                            var key = 0

                            for (var i = 0; i < this.game.deck.suits.length; i++) {
                                // Run through all suits

                                var numberOfSuit = 0

                                this.game.opponentCards.forEach(card => {
                                    // Run through all card in the opponent's hand

                                    if (card.card.suit === this.game.deck.suits[i].name) {
                                        // Case the suits match

                                        // Add to the suit count
                                        numberOfSuit++

                                        if (numberOfSuit === 3) {
                                            keepSuits = [card.card.suit]
                                        }
                                    }
                                })
                            }

                            // Get all cards with different suits
                            const validRemovals = this.game.opponentCards.filter(card => { 
                                var remove = true
                                keepSuits.forEach(suit => {
                                    if (card.card.suit === suit) {
                                        remove = false
                                    }
                                }) 
                                return remove
                            })

                            // Remove random card from validRemovals
                            selection =  this.game.opponentCards.indexOf(validRemovals[Math.floor(Math.random() * validRemovals.length)]) + 1
                        }

                    }
                }

                // Delay 100 ms so the player can see the computer having it's turn
                await this.wait(1000)

                if (selection > 5) {
                    selection = 5
                }

                // Discard selected card
                await this.discard(selection)
            }

            // Start next turn
            this.nextTurn()
        }
    }

    nextTurn() {
        // Toggle currentTeam to next player
        this.currentTeam = this.currentTeam === "player" ? "opponent" : "player"

        // Starts new turn
        this.turn()
    }

    init() {
        // Starts first turn
        this.turn()
    }
}