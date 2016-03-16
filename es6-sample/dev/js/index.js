
class Shape {
		constructor (id, x, y) {
				this.id = id
				this.move(x, y)
		}
		move (x, y) {
				this.x = x
				this.y = y
		}
}

var x = new Shape(12,2,1);
x.move(12,12)

$("#content").text(x.id + ": (" + x.x + "," + x.y + ")")
