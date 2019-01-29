var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Circle(x, y, radius, dx, dy) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
		c.strokeStyle = 'red';
		c.fillStyle = 'blue';
		c.lineWidth = 5;
		c.stroke();
		c.fill();
	}

	this.update = function() {

		// edge detection and management
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
		
		this.draw();

	}
}

var circleArray = [];

for (var i = 0; i <= 100; i++) {
	var radius = Math.random() * 50,
		x = Math.random() * (innerWidth - radius * 2) + radius,
		y = Math.random() * (innerHeight - radius * 2) + radius,
		dx = (Math.random() * - .5) * 10,
		dy = (Math.random() * - .5) * 10,

	circleArray.push(new Circle(x, y, radius, dx, dy));
}

function animate() {
	
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

}

animate();