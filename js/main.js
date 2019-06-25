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

	const paint = function(event) {
		
		controller.updateClick(event)
		let locationOnBuffer = display.findClickLocation(event)
		tileX = Math.floor(locationOnBuffer.x / game.world.tile_size)
		tileY = Math.floor(locationOnBuffer.y / game.world.tile_size)
		game.world.map[tileY][tileX] = 1

	}

	const update = function() {

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
	document.querySelector("#canvas").addEventListener("mouseup", paint)

})
