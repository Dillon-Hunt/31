class Card {
    constructor(config) {
        this.card = config.card
        this.isPlayer = config.isPlayer
        this.accessible = config.accessible
    }

    createElement() {
        this.cardOuter = document.createElement("div")
        this.cardOuter.classList.add(`${this.isPlayer ? "player" : "opponent"}-card-outer`)
        if (!this.isPlayer) {
            this.cardOuter.classList.add("not-selectable")
        }
        this.cardOuter.classList.add("card-outer")
        this.cardOuter.style.backgroundColor = this.isPlayer ? this.card.outerColor : "#646469"

        this.cardInner =  document.createElement("div")
        this.cardInner.classList.add(`${this.isPlayer ? "player" : "opponent"}-card-inner`)
        this.cardInner.classList.add("card-inner")
        this.cardInner.style.backgroundColor = this.isPlayer ? this.card.innerColor : "#91919e"

        this.cardSymbol = document.createElement("p")
        this.cardSymbol.classList.add(`${this.isPlayer ? "player" : "opponent"}-card-symbol`)
        this.cardSymbol.classList.add("card-symbol")
        this.cardSymbol.innerText =  this.isPlayer ? this.card.symbol : "?"
    }

    removeCard() {
        this.cardOuter.remove()
    }

    update(card, end) {
        this.card = card
        this.end = end || false
        if (this.isPlayer || this.end) {
            this.cardOuter.style.backgroundColor = this.card.outerColor
            this.cardInner.style.backgroundColor = this.card.innerColor
            this.cardSymbol.innerText = this.card.symbol
        }
    }

    init(container) {
        this.createElement()
        this.cardInner.appendChild(this.cardSymbol)
        this.cardOuter.appendChild(this.cardInner)
        container.appendChild(this.cardOuter)

        if (this.isPlayer && this.accessible) {
            // Accessability Focus Settings
            this.cardOuter.classList.add("accessible")
        } 

        this.update(this.card)
    }
}