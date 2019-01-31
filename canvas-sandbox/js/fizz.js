function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
function Star(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = {
        x: randomIntFromRange(-.5, .5),
        y: 3
    }
    this.gravity = -.1
    this.friction = 10
}

Star.prototype.draw = function() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(227, 234, 239, 1)`
    c.shadowColor = '#e3eaef'
    c.fill()
    c.closePath()
    c.restore()
}

Star.prototype.update = function() {
    this.draw()
    this.velocity.y += this.gravity
    this.x += this.velocity.x;
    this.y += this.velocity.y;
}

// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')

let stars
let ticker = 0
let randomSpawnRate = 1

function init() {
    stars = []

    for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 2
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = backgroundGradient
    c.fillRect(0, 0, canvas.width, canvas.height)

    stars.forEach((star, index) => {
        star.update();
    });

    ticker++

    if (ticker % randomSpawnRate == 0) {
        const x = Math.random() * canvas.width
        const y = canvas.height
        stars.push(new Star(x, y, 4, '#e3eaef'))
        randomSpawnRate = randomIntFromRange(1, 5)
    }
}

init()
animate()
