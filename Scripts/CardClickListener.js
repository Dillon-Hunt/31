class CardClickListener {
    constructor(element, callback) {
        let keySafe = true
        this.element = element
        this.cardClickFunction = () => {
            if (keySafe) {
                keySafe = false
                callback()
            }
        }

        // Can be controlled by the keyboard
        this.element.onkeyup = (e) => {
            if (e.keyCode === 13) {
                this.cardClickFunction()
            }
        }

        this.element.onclick = this.cardClickFunction
    }

    unbind() {
        this.element.onkeyup = null
        this.element.onclick = null
    }
}