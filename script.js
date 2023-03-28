const numberOfCircles = 100
const upperSizeBound = 150
const lowerSizeBound = 50
const circles = []
const speed = 5
let lastTimestamp = 0

class Circle {
    constructor(speedX, speedY, element) {
        this._speedX = speedX
        this._speedY = speedY
        this.element = element
    }

    move () {
        this._redirect()

        const top = this._speedY * speed
        const left = this._speedX * speed
        this.element.style.top = parseInt(this.element.style.top) + top + 'px'
        this.element.style.left = parseInt(this.element.style.left) + left + 'px'
    }

    _redirect () {
        const { innerWidth, innerHeight } = window
        const top = parseInt(this.element.style.top)
        const left = parseInt(this.element.style.left)
        const width = parseInt(this.element.style.width)
        const height = parseInt(this.element.style.height)

        if (top < 0 || top > innerHeight) {
            this._speedY *= -1
        }
        else if (left < 0 || left > innerWidth) {
            this._speedX *= -1
        }
    }
}

function animate() {
    window.requestAnimationFrame(nextStep)

    function nextStep(timestamp) {
        if (true) {
            for (let circle of circles) {
                circle.move()
            }
            lastTimestamp = timestamp
        }
        window.requestAnimationFrame(nextStep)
    }
}

function init() {
    const { innerWidth, innerHeight } = window
    const content = document.getElementById('content')

    for (let i=0; i<numberOfCircles; i++) {
        const element = document.createElement('div')
        const top = randomNumber(0, innerHeight)
        const left = randomNumber(0, innerWidth)
        const size = randomNumber(lowerSizeBound, upperSizeBound)
        const color = randomColor()
        const speedX = randomNumber(-1, 1)
        const speedY = randomNumber(-1, 1)
        const circle = new Circle(speedX, speedY, element)

        // ----------------------
        element.classList.add('square')
        element.style.width = `${size}px`
        element.style.height = `${size}px`
        element.style.background = `${color}`
        element.style.top = `${top}px`
        element.style.left = `${left}px`

        content.appendChild(element)
        circles.push(circle)
    }
    animate()

    function randomNumber(min, max) {
        return Math.random() * (max - min + 1) + min
    }

    function randomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16)
    }
}

init()