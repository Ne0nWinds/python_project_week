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

    this.columns = 16;
    this.rows = 16;
    this.tile_size = 16;
    this.map = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    this.height = this.tile_size * this.rows;
    this.width = this.tile_size * this.columns;

    this.update = function() {
        this.player.velocity_y += this.gravity;
        this.player.update();

        this.player.velocity_y *= this.friction;
        this.player.velocity_x *= this.friction;

        this.collideObject(this.player);
    }

    this.collideObject = function(object) {
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }
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

    this.moveLeft = function() { this.velocity_x -= 0.75; },
    this.moveRight = function() { this.velocity_x += 0.75; },

    this.update = function() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

}

