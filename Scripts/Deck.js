class Deck {
    constructor(config) {
        this.decks = config.decks || 1
        this.suits = config.suits || 
        [
            {name: "Green", outerColor: "#598076", innerColor: "#82BAAD"}, 
            {name: "Pink", outerColor: "#80597C", innerColor: "#D792D0"},
            {name: "Blue", outerColor: "#595D80", innerColor: "#8288BA"},
            {name: "Yellow", outerColor: "#80703A", innerColor: "#BAA455"},/* 
            {name: "White", outerColor: "#FFF", innerColor: "rgb(161, 167, 255)"},
            {name: "Green", outerColor: "#82BAAD", innerColor: "#D86C6C"}, 
            {name: "Pink", outerColor: "#D792D0", innerColor: "#D86C6C"},
            {name: "Blue", outerColor: "#8288BA", innerColor: "#1B1B1B"},
            {name: "Yellow", outerColor: "#C2AB58", innerColor: "#1B1B1B"}, */
        ]
        this.cards = config.cards || 
        [
            { name: "Ace", symbol: "A", values: [1, 11] }, /* 
            { name: "Evens", symbol: "E", values: [2, 4, 6, 8] }, 
            { name: "Odds", symbol: "O", values: [1, 3, 5, 9] },  */
            //{ name: "Two", values: [2] }, 
            /* { name: "Three", values: [3] }, 
            { name: "Four", values: [4] }, 
            { name: "Five", values: [5] }, 
            { name: "Six", values: [6] }, 
            { name: "Seven", values: [7] }, 
            { name: "Eight", values: [8] },
            { name: "Nine", values: [9] },  
            { name: "Ten", values: [10] },  */
            { name: "Jack", symbol: "J", values: [10] }, 
            { name: "Queen", symbol: "Q", values: [10] }, 
            { name: "King", symbol: "K", values: [10] },
        ]
        this.deck = null
        this.prevCards = []
        this.accessible = config.accessible
    }

    createElement() {
        this.prevCardOuter = document.createElement("div")
        this.prevCardOuter.classList.add(`deck-card-outer-prev`)
        this.prevCardOuter.classList.add("card-outer")
        this.prevCardOuter.style.backgroundColor = "#646469"

        this.prevCardInner =  document.createElement("div")
        this.prevCardInner.classList.add(`deck-card-inner-prev`)
        this.prevCardInner.classList.add("card-inner")
        this.prevCardInner.style.backgroundColor = "#91919e"

        this.prevCardSymbol = document.createElement("p")
        this.prevCardSymbol.classList.add(`deck-card-symbol-prev`)
        this.prevCardSymbol.classList.add("card-symbol")
        this.prevCardSymbol.innerText = "?"

        this.cardOuter = document.createElement("div")
        this.cardOuter.classList.add(`deck-card-outer`)
        this.cardOuter.classList.add("card-outer")
        this.cardOuter.style.backgroundColor = "#646469"

        this.cardInner =  document.createElement("div")
        this.cardInner.classList.add(`deck-card-inner`)
        this.cardInner.classList.add("card-inner")
        this.cardInner.style.backgroundColor = "#91919e"

        this.cardSymbol = document.createElement("p")
        this.cardSymbol.classList.add(`deck-card-symbol`)
        this.cardSymbol.classList.add("card-symbol")
        this.cardSymbol.innerText = "?"
    }

    createDeck() {
        var newDeck = []
        for (var i = 0; i < this.decks; i++) {
            this.suits.forEach(suit => {
                this.cards.forEach(card => {
                    newDeck.push({
                        name: suit.name + " " + card.name,
                        symbol: card.symbol || card.values[0].toString(),
                        innerColor: suit.innerColor,
                        outerColor: suit.outerColor,
                        suit: suit.name,
                        values: card.values
                    })
                })
            })
        }
        return newDeck
    }

    getDeck() {
        return this.deck
    }

    drawCard() {
        const index = Math.floor(Math.random() * this.deck.length)
        const card = this.deck[index]
        this.deck.splice(index, 1)
        this.update()
        return card
    }

    update() {
        this.cardSymbol.innerText = "?"
        //this.cardSymbol.innerText = this.deck.length
    }

    updateDiscard(prevCard) {
        if (prevCard) {
            this.prevCards.push(prevCard)
        }
        if (this.prevCards.length > 0) {
            const lastCard = this.prevCards.length - 1
            this.prevCardOuter.style.backgroundColor = this.prevCards[lastCard].outerColor
            this.prevCardInner.style.backgroundColor = this.prevCards[lastCard].innerColor
            this.prevCardSymbol.innerText = this.prevCards[lastCard].symbol
        } else {
            this.prevCardOuter.style.backgroundColor = "#000"
            this.prevCardInner.style.backgroundColor = "#000"
            this.prevCardSymbol.innerText = "Empty"
        }
    }

    init(container) {
        this.createElement()
        this.prevCardInner.appendChild(this.prevCardSymbol)
        this.prevCardOuter.appendChild(this.prevCardInner)
        container.appendChild(this.prevCardOuter)
        this.cardInner.appendChild(this.cardSymbol)
        this.cardOuter.appendChild(this.cardInner)
        container.appendChild(this.cardOuter)
        this.cardOuter.tabIndex = 0
        this.cardOuter.setAttribute("role", "button")
        this.prevCardOuter.tabIndex = 0
        this.prevCardOuter.setAttribute("role", "button")
        this.deck = this.createDeck()

        if (this.accessible) {
            // Accessability Focus Settings
            this.prevCardOuter.classList.add("accessible")
            this.cardOuter.classList.add("accessible")
        } 

        this.update()
        this.updateDiscard(this.drawCard())
    }
}