const Game = function() {

    this.world = new Game.World(),

    this.update = function() {
        this.world.update();
    }

}

Game.World = function(friction_x=0.65, friction_y=0.85, gravity=1) {
    this.friction_x = friction_x;
    this.friction_y = friction_y;
    this.gravity = gravity;

    this.player = new Game.Player();

    this.tile_size = 16;
    this.map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
               [1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1],
               [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
               [1,0,0,1,0,0,0,1,1,1,1,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    this.height = this.tile_size * this.map[0].length;
    this.width = this.tile_size * this.map.length;

    this.update = function() {
        this.player.velocity_y += this.gravity;
		this.collideObject(this.player);
        this.player.update();

        this.player.velocity_y *= this.friction_y;
        this.player.velocity_x *= this.friction_x;

    }

    this.collideObject = function(object) {

		for (let y = 0; y < 2; y++) {
			for (let x = 0; x < 2; x++) {
				current_x = Math.floor((object.x + x * object.width) / this.tile_size)
				current_y = Math.floor((object.y + y * object.height)  / this.tile_size)
				new_x = Math.floor(((object.x + x * object.width) + object.velocity_x) / this.tile_size)
				new_y = Math.floor(((object.y + y * object.height) + object.velocity_y) / this.tile_size)

				if (this.map[new_y][current_x] == 1) { //Vertical Collision

					
					if (object.velocity_y > 0) {
						object.y = new_y * this.tile_size - object.height - 0.1
						object.jumping = false;
					} else if (object.velocity_y < 0) {
						object.y = new_y * this.tile_size + this.tile_size + 0.1	
					}

					object.velocity_y = 0;

				}
				if (this.map[current_y][new_x] == 1) {
					if (object.velocity_x > 0) { //RIGHT
						object.x = new_x * this.tile_size - object.width - 0.1
					} else { //LEFT
						object.x = new_x * this.tile_size + this.tile_size + 0.1
					}
					object.velocity_x = 0;
				}
					
			}
		}
		
    }

}

Game.World.prototype = {

    constructor: Game.World,

}
Game.Player = function(x,y) {

    this.color = "#ff0000"
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 15.8;
    this.height = 15.8;
    this.x = 100;
    this.y = 50;

    this.jump = function() {

        if (!this.jumping && this.velocity_y == 0) {

            this.jumping = true;
            this.velocity_y -= 20;

        }

    }

	this.getBottom = function() { return this.y + this.height }
	this.getTop = function() { return this.y } 
	this.getLeft = function() { return this.x } 
	this.getRight = function() { return this.x + this.width } 

    this.moveLeft = function() { this.velocity_x -= 1; },
    this.moveRight = function() { this.velocity_x += 1; },

    this.update = function() {
		
		if(this.velocity_y == 0) {

			console.log("On the ground, increase");
		} else {
			console.log("In the air, decrease");
		}
        this.x += this.velocity_x;
        this.y += this.velocity_y;
		
    }

}
