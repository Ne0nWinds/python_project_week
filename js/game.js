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
    this.map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,1,1,4,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,1,1,1,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

	teleport_nodes = [
		{x:4, y:19},
		{x:8, y:14},
		{x:16, y:17},
	];
	this.find_teleporters = function() {
		
	}

    this.width = this.tile_size * this.map[0].length;
    this.height = this.tile_size * this.map.length;

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

				if (new_y >= this.map.length - 1) {
					object.y = (new_y - 9) * this.tile_size;
				}

				if (this.map[new_y][current_x] == 1) { // Vertical Collision
					if (object.velocity_y > 0) { //DOWN
						object.y = new_y * this.tile_size - object.height - 0.1;
						object.jumping = false;
					} else if (object.velocity_y < 0) { //UP
						object.y = new_y * this.tile_size + this.tile_size + 0.1;
					}
					object.velocity_y = 0;
				}
				
				if (this.map[current_y][new_x] != 0 && this.map[current_y][new_x] != 2) { // Horizontal Collision
					if (object.velocity_x > 0) { //RIGHT
						object.x = new_x * this.tile_size - object.width - 0.1;
					} else if (object.velocity_x < 0) { //LEFT
						object.x = new_x * this.tile_size + this.tile_size + 0.1;
					}
					object.velocity_x = 0;
				}

				// SKINNY PLATFORM
				if (this.map[new_y][current_x] == 2 && y != 0) {
					if (object.velocity_y > 0) {
						object.y = new_y * this.tile_size - object.height - 0.1;
						object.jumping = false;
						object.velocity_y = 0;
					}
				}

				// BOUNCE PLATFORM
				if (this.map[new_y][current_x] == 3) {
					if (object.velocity_y > 0) { // TOP
						object.y = new_y * this.tile_size - object.height - 0.1;
						object.jumping = true;
						object.velocity_y -= 35;
					} else if (object.velocity_y < 0) {
						object.y = new_y * this.tile_size + this.tile_size + 0.1;
						object.velocity_y = 0;
					}
				}

				// TELEPORTERS
				if (this.map[new_y][current_x] == 4) {
					if (object.velocity_y > 0 && object.last_teleport >= 120) {
						teleporter = teleport_nodes[randInt(teleport_nodes.length)];
						object.x = teleporter.x * this.tile_size;
						object.y = teleporter.y * this.tile_size - object.height;
						object.velocity_x = 0;
						object.last_teleport = 0;
					} else if (object.velocity_y > 0) {
						object.y = new_y * this.tile_size - object.height - 0.1;
					} else if (object.velocity_y < 0) {
						object.y = new_y * this.tile_size + this.tile_size + 0.1;
					}
					object.velocity_y = 0;
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
    this.width = 12;
    this.height = 12;
    this.x = 16;
    this.y = 40;
	this.last_teleport = 120;

    this.jump = function() {

        if (!this.jumping && this.velocity_y == 0) {

            this.jumping = true;
            this.velocity_y -= 17.5; // Jump height

        }

    }

	this.getBottom = function() { return this.y + this.height }
	this.getTop = function() { return this.y } 
	this.getLeft = function() { return this.x } 
	this.getRight = function() { return this.x + this.width } 

	// Horizontal Speed
    this.moveLeft = function() { this.velocity_x -= 1.1; },
    this.moveRight = function() { this.velocity_x += 1.1; },

    this.update = function() {
		
		if(this.velocity_y == 0) {
			this.friction_x = 0.65;
			// On the ground, increase the grip
		} else {
			this.friction_x = 0.9;
			// In the air, decrease the resistance
		}
        this.x += this.velocity_x;
        this.y += this.velocity_y;

		this.last_teleport += 1;
		
    }

}
