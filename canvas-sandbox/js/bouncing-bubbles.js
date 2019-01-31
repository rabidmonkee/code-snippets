var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// circle object
function Circle(x, y, dx, dy, radius, red, green, blue, alpha, lwidth, lred, lgreen, lblue) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.red = red;
	this.blue = blue;
	this.green = green;
	this.alpha = alpha;
	this.lwidth = lwidth;
	this.lred = lred;
	this.lblue = lblue;
	this.lgreen = lgreen;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
		c.strokeStyle = 'rgb(' + this.lred + ',' + this.lgreen + ',' + this.lblue + ')';
		c.fillStyle = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
		c.lineWidth = this.lwidth;
		// c.stroke();
		c.fill();
	}

	this.update = function() {

		// edge detection and reaction
		if (this.x + this.radius + this.lwidth > innerWidth || this.x - this.radius - this.lwidth < 0 ) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius + this.lwidth > innerHeight || this.y - this.radius - this.lwidth < 0 ) {
			this.dy = -this.dy;
		}

		// velocity assignment
		this.x += this.dx;
		this.y += this.dy;
		
		this.draw();

	}
}

var circleArray = [];

for (var i = 0; i <= 100; i++) {

	// randomizing variables
	var radius = Math.random() * 50,
		x = Math.random() * (innerWidth - radius * 2) + radius,
		y = Math.random() * (innerHeight - radius * 2) + radius,
		dx = (Math.random() * - .5) * 10,
		dy = (Math.random() * - .5) * 10,
		red = Math.random() * 255,
		green = Math.random() * 255,
		blue = Math.random() * 255,
		alpha = Math.random() * 2,
		lwidth = Math.random() * 10,
		lred = Math.random() * 255,
		lgreen = Math.random() * 255,
		lblue = Math.random() * 255;

	circleArray.push(new Circle(x, y, dx, dy, radius, red, green, blue, alpha, lwidth, lred, lgreen, lblue));
}

function animate() {
	
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

}

animate();