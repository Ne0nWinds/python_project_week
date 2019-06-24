const Game = function() {

    this.world = new Game.World(),

    this.update = function() {
        this.world.update();
    }

}

Game.World = function(friction=0.85,gravity=1) {
    this.friction = friction;
    this.gravity = gravity;

    this.player = new Game.Player();

    this.tile_size = 16;
    this.map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1],
               [1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    this.height = this.tile_size * this.map[0].length;
    this.width = this.tile_size * this.map.length;

    this.update = function() {
        this.player.velocity_y += this.gravity;
		this.collideObject(this.player);
        this.player.update();

        this.player.velocity_y *= this.friction;
        this.player.velocity_x *= this.friction;

    }

    this.collideObject = function(object) {

		current_x = Math.floor(object.getLeft() / this.tile_size)
		current_y = Math.floor(object.getBottom() / this.tile_size)
		new_x = Math.floor((object.getLeft() + object.velocity_x) / this.tile_size)
		new_y = Math.floor((object.getBottom() + object.velocity_y ) / this.tile_size)
	
		if (this.map[new_y][current_x] == 1) {
			object.velocity_y = 0;
		}

		if (this.map[current_y][new_x] == 1) {
			object.velocity_x = 0;
		}
		

		current_x = Math.floor(object.getRight() / this.tile_size)
		current_y = Math.floor(object.getBottom() / this.tile_size)
		new_x = Math.floor((object.getRight() + object.velocity_x) / this.tile_size)
		new_y = Math.floor((object.getBottom() + object.velocity_y ) / this.tile_size)
	
		if (this.map[new_y][current_x] == 1) {
			object.velocity_y = 0;
			object.jumping = false;
		}

		if (this.map[current_y][new_x] == 1) {
			object.velocity_x = 0;
		}

		current_x = Math.floor(object.getRight() / this.tile_size)
		current_y = Math.floor(object.getTop() / this.tile_size)
		new_x = Math.floor((object.getRight() + object.velocity_x) / this.tile_size)
		new_y = Math.floor((object.getTop() + object.velocity_y ) / this.tile_size)
	
		if (this.map[new_y][current_x] == 1) {
			object.velocity_y = 0;
		}

		if (this.map[current_y][new_x] == 1) {
			object.velocity_x = 0;
		}

		current_x = Math.floor(object.getLeft() / this.tile_size)
		current_y = Math.floor(object.getTop() / this.tile_size)
		new_x = Math.floor((object.getLeft() + object.velocity_x) / this.tile_size)
		new_y = Math.floor((object.getTop() + object.velocity_y ) / this.tile_size)
	
		if (this.map[new_y][current_x] == 1) {
			object.velocity_y = 0;
		}

		if (this.map[current_y][new_x] == 1) {
			object.velocity_x = 0;
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
    this.width = 16;
    this.height = 16;
    this.x = 100;
    this.y = 50;

    this.jump = function() {

        if (!this.jumping) {

            this.jumping = true;
            this.velocity_y -= 30;

        }

    }

	this.getBottom = function() { return this.y + this.height }
	this.getTop = function() { return this.y } 
	this.getLeft = function() { return this.x } 
	this.getRight = function() { return this.x + this.width } 

    this.moveLeft = function() { this.velocity_x -= 0.75; },
    this.moveRight = function() { this.velocity_x += 0.75; },

    this.update = function() {
		
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

}
