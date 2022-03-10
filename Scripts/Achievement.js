class Achievement {
    constructor (config) {
        this.achievement = config.achievement
    }

    createElement() {
        this.element = document.createElement('div')
        this.element.classList.add("achievement-section")
        this.element.style.display = "block"
        this.element.innerHTML = (`
            <div class="achievement-section-content">
                <p class="banner achievement-banner">New Achievement</p>
                <p class="centered-text">You earned <span class="orange achievement-name-top">${this.achievement.name} Level ${this.achievement.level}</span>.</p>
                <img class="achievement-image" src="./images/${this.achievement.image === undefined ? "Achievement-1" : this.achievement.image}.svg">
                <p class="achievement-name">${this.achievement.name}</p>
                <p class="achievement-message">${this.achievement.text.replaceAll("{GOAL}", this.achievement.goal)}</p>
                <div class="break"></div>
                <p class="centered-text"><span class="orange achievement-name-next">Level ${this.achievement.level + 1}</span></p>
                <p class="centered-text achievement-name-next-text">${this.achievement.nextText.replaceAll("{GOAL}", this.achievement.goal + this.achievement.increment)}</p>
                <button class="next-button-1">Next</button>
            </div>
        `)
        this.element.querySelector(".next-button-1").onclick = () => {
            this.removeElement()
        } 
    }

    removeElement() {
        this.element.remove()
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)
    }
}