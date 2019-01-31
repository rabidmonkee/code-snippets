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
        x: randomIntFromRange(-4, 4),
        y: 3
    }
    this.gravity = .1
    this.friction = 0.8
}

Star.prototype.draw = function() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(227, 234, 239, .85)`
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

function MiniStar(x, y, radius, color) {
    Star.call(this, x, y, radius, color)
    this.velocity = {
        x: (Math.random() -0.5) * 8,
        y: randomIntFromRange(-15, 15)
    }
    this.gravity = .5
    this.friction = 0.8
    this.ttl = randomIntFromRange(60, 100) // time to live in frames
    this.opacity = 1
}

MiniStar.prototype.draw = function() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`
    c.shadowColor = '#e3eaef'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
}

function creatMountainRange (mountainAmount, height, color) {
    for (let i = 0; i < mountainAmount; i++) {
        const mountainWidth = canvas.width / mountainAmount
        c.beginPath()
        c.moveTo(i * mountainWidth, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth +325, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
        c.lineTo(i * mountainWidth - 325, canvas.height)
        c.fillStyle = color
        c.fill()
        c.closePath()
    }
}

// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')

let stars
let miniStars
let backgroundStars
let ticker = 0
let randomSpawnRate = 1

function init() {
    stars = []
    miniStars = []
    backgroundStars = []

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 3
        backgroundStars.push(new Star(x, y, radius, 'white'))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = backgroundGradient
    c.fillRect(0, 0, canvas.width, canvas.height)

    backgroundStars.forEach(backgroundStar => {
        backgroundStar.draw()
    })

    creatMountainRange(1, canvas.height - 50, '#384551')
    creatMountainRange(2, canvas.height - 100, '#2b3843')
    creatMountainRange(3, canvas.height - 300, '#26333e')

    stars.forEach((star, index) => {
        star.update();

    });

    ticker++

    if (ticker % randomSpawnRate == 0) {
        const x = Math.random() * canvas.width
        stars.push(new Star(x, -100, 12, '#e3eaef'))
        randomSpawnRate = randomIntFromRange(10, 20)
    }
}

init()
animate()
