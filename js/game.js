function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max));

}
const Game = function() {

    this.world = new Game.World(),

    this.update = function() { this.world.update(); }

}

Game.World = function(friction_x=0.65, friction_y=0.85, gravity=1) {
    this.friction_x = friction_x;
    this.friction_y = friction_y;
    this.gravity = gravity;

    this.players = [];
	this.game_state = "menu";
	this.win_score = 10;
	this.winner = false;

    this.tile_size = 16;
    this.map = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

	this.width = this.tile_size * this.map[0].length;
	this.height = this.tile_size * this.map.length;

	this.spawn_points = []

	this.teleport_nodes = [
		//example => {"x" : 14, "y" : 25,},
		//example => {"x" : 8, "y" : 13,},
	];

	this.next_teleporter = function(current_x, current_y) {
		potential_nodes = [];
		for (node of this.teleport_nodes) {
			if (node.x != current_x || node.y != current_y) {
				potential_nodes.push(node);
			}
		}
		//console.log(potential_nodes[Math.floor(Math.random() * potential_nodes.length)]);
		return potential_nodes[Math.floor(Math.random() * potential_nodes.length)];
	};

	this.clear_teleporter = function(x,y) {
		for (i in this.teleport_nodes) {
			if (this.teleport_nodes[i].x == x && this.teleport_nodes[i].y == y) {
				this.teleport_nodes.splice(i, 1);
				return;
			}
		}
	}

	this.addPlayer = function(color,ctrl) {

		this.players.push(new Game.Player(color, ctrl))

	};

	this.generateSpawnPoints = function() {
		for (let y = 0; y < this.map.length - 1;y++) {
			for (let x = 0; x < this.map[0].length;x++) {
				if (this.map[y][x] == 0) {
					if (this.map[y + 1][x] != 0 && this.map[y + 1][x] != 3) {
						this.spawn_points.push({"x" : x,"y" : y})
					}
				}
			}
		}
	} 

	this.spawnPlayer = function(player) {
		let spawnPoint = this.spawn_points[randInt(this.spawn_points.length)]
		player.x = spawnPoint.x * this.tile_size + (this.tile_size - player.width) / 2
		player.y = spawnPoint.y * this.tile_size
		player.alive = true;
	}

    this.update = function() {
		for (let player of this.players) {
			player.velocity_y += this.gravity;
			this.collideObject(player);
			player.update();
			this.collidePlayers();
			player.velocity_y *= this.friction_y;
			player.velocity_x *= this.friction_x;

			if (!player.alive) {
				player.last_death += 1;
				if (player.last_death > 150) {
					this.spawnPlayer(player)
				}
			}
		}
    };

	this.collidePlayers = function() {
		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players.length; j++) {
				if (i != j) { // don't check the same player against himself
					if (this.players[i].y + this.players[i].height >= this.players[j].y) {
						if (this.players[i].y + this.players[i].height <= this.players[j].y + this.players[j].height / 2) { // checking if bottom of the attacking player is above the top half of the victim player
							if (this.players[i].x <= this.players[j].x + this.players[j].width && this.players[i].x > this.players[j].x || this.players[i].x + this.players[i].width <= this.players[j].x + this.players[j].width && this.players[i].x + this.players[i].width >= this.players[j].x)  {
							
								if (this.players[i].alive) {
									this.players[i].velocity_y -= 15;
									this.players[i].score++;
									this.players[j].kill();
									this.players[j].x = 1000;
									this.players[j].y = 1000;
								}

							}
						}
					}
				}
			}
		}
	}

    this.collideObject = function(object) {

		for (let y = 0; y < 2; y++) {
			for (let x = 0; x < 2; x++) {
				current_x = Math.floor((object.x + x * object.width) / this.tile_size)
				current_y = Math.floor((object.y + y * object.height)  / this.tile_size)
				new_x = Math.floor(((object.x + x * object.width) + object.velocity_x) / this.tile_size)
				new_y = Math.floor(((object.y + y * object.height) + object.velocity_y) / this.tile_size)

				if (new_y >= this.map.length || current_y >= this.map.length) {
					if (object.alive) {
						object.kill();
						object.score = Math.max(0,object.score - 1);
					}
				}
				
				if (new_y >= this.map.length || new_y < 0 || current_y < 0 || current_y >= this.map.length) {
					continue;
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
					if (object.velocity_y > 0 && object.last_teleport >= 90 && this.teleport_nodes.length > 1) {
						object.velocity_x = 0;
						console.log(this.next_teleporter(current_x, new_y));
						object.x = this.next_teleporter(current_x, new_y).x * this.tile_size + (this.tile_size - object.width)/2;
						object.y = this.next_teleporter(current_x, new_y).y * this.tile_size - object.height;
						object.last_teleport = 0;
					} else if (object.velocity_y > 0) {
						object.y = new_y * this.tile_size - object.height - 0.1;
						object.jumping = false;
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
Game.Player = function(color,ctrl) {

    this.color = color;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 12;
    this.height = 12;
    this.x = 1000;
    this.y = 1000;
	this.last_teleport = 90;
	this.last_death = 200;
	this.jump_active = true;
	this.alive = false;
	this.score = 0;
	this.controls = ctrl;

    this.jump = function() {

        if (this.jump_active && !this.jumping && this.velocity_y == 0) {

            this.jumping = true;
            this.velocity_y -= 17.5; // Jump height
			this.jump_active = false;

        }

    }

	this.kill = function() {
		this.alive = false;
		this.last_death = 0
	}

	this.getBottom = function() { return this.y + this.height }
	this.getTop = function() { return this.y } 
	this.getLeft = function() { return this.x } 
	this.getRight = function() { return this.x + this.width } 

	// Horizontal Speed
    this.moveLeft = function(modifier=1) {
		 this.velocity_x -= (1.1 * modifier); 
	},
    this.moveRight = function(modifier=1) { 
		this.velocity_x += (1.1 * modifier); 
	},

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
