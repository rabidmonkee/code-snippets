var canvas = document.querySelector('canvas');

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