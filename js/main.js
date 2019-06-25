window.addEventListener("load", function() {

	const game = new Game();
	const display = new Display(document.querySelector("#canvas"),game.world.width,game.world.height);
	const controller = new Controller();

	const render = function() {
		display.fill("rgba(0,0,0,0.99)");
		display.drawMap(game.world.map,game.world.tile_size)
		display.drawRectangle(game.world.player.x,game.world.player.y,game.world.player.width,game.world.player.height,game.world.player.color)
		display.render();
	}

	let locationOnBuffer;
	const paint = function(event) {
		
		controller.updateClick(event)
		locationOnBuffer = display.findClickLocation(event)

	}

	let tileType = 1;
	let switched = false;
	const update = function() {

		if (controller.rightMouseDown) {
			if (!switched) {
				tileType = (tileType + 1) % 3
				console.log(tileType)
				switched = true;
			}
		} else {
			switched = false;
		}

		if (controller.mouseDown) {
			tileX = Math.floor(locationOnBuffer.x / game.world.tile_size)
			tileY = Math.floor(locationOnBuffer.y / game.world.tile_size)
			game.world.map[tileY][tileX] = tileType;
		}

		if (controller.right) {
			game.world.player.moveRight()
		}
		if (controller.left) {
			game.world.player.moveLeft()
		}
		if (controller.up) {
			game.world.player.jump()
		}

		game.update()

	}

	const engine = new Engine(120,update,render)
	engine.run()


	const resize = function() {
		display.resize(document.documentElement.clientWidth-128,document.documentElement.clientHeight-128,game.world.height/game.world.width)
		display.render()
	}
	resize()

	window.addEventListener("keydown", controller.updateKeys)
	window.addEventListener("keyup", controller.updateKeys)
	window.addEventListener("resize", resize)
	document.querySelector("#canvas").addEventListener("mousedown", paint)
	document.querySelector("#canvas").addEventListener("mousemove", paint)
	document.querySelector("#canvas").addEventListener("mouseup", paint)

})
