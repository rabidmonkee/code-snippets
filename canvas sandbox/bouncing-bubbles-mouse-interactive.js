// bouncing-bubbles-mouse-interactive.js
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// assign mouse positions to nothing
var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 50;

var colorArray = [
	'#415B76',
	'#7B9BA6',
	'#CDD6D5',
	'#EEF4F2'
];

// watch mouse position
window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
})

// watch window resize
window.addEventListener('resize', function(event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})

// circle object
function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
		c.fillStyle = this.color;
		c.lineWidth = this.lwidth;
		c.fill();
	}

	this.update = function() {

		// edge detection and reaction
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
			this.dy = -this.dy;
		}

		// velocity assignment
		this.x += this.dx;
		this.y += this.dy;

		// mouse interaction
		if (
			mouse.x - this.x < 50 
			&& 
			mouse.x - this.x > -50
			&&
			mouse.y - this.y < 50
			&&
			mouse.y - this.y > -50
			) {
				if (this.radius < maxRadius) {
					this.radius += 1;
			 	}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		};
		
		this.draw();

	}
}

var circleArray = [];

function init() {

	circleArray = [];

	for (var i = 0; i <= 800; i++) {

		// randomizing variables
		var radius = Math.random() * 15 + 1,
			x = Math.random() * (innerWidth - radius * 2) + radius,
			y = Math.random() * (innerHeight - radius * 2) + radius,
			dx = (Math.random() * - .5) * 2,
			dy = (Math.random() * - .5) * 2;

		circleArray.push(new Circle(x, y, dx, dy, radius));
	}

}

function animate() {
	
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

}

// init after resize
init();

// start animation
animate();