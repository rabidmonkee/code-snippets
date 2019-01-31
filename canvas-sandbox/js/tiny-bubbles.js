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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// circle object
function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = 'rgba(255, 255, 255, 0.65)';
		c.fillStyle = 'rgba(255, 255, 255, 0.1)';
		c.stroke();
		c.fill();
	}

	this.update = function() {

		// edge detection and reaction
		if (this.y <= 0) {
			this.y = innerHeight - radius;
		}

		// velocity assignment
		this.y += this.dy;
		
		this.draw();
	}
}

var circleArray = [];

for (var i = 0; i <= 400; i++) {
	// randomizing variables
	var radius = Math.random() * 5;
	var x = Math.random() * (innerWidth - radius *2) + radius;
	var y = innerHeight - radius;
	var dx = (Math.random() * - .5) * 10;
	var dy = (Math.random() * - .5) * 10;

	circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
	
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

}

animate();