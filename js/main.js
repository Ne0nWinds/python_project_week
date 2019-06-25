function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
window.addEventListener("load", function() {

	const game = new Game();
	const display = new Display(document.querySelector("#canvas"),game.world.width,game.world.height);
	const paintController = new PaintController()

// adding players
	const player1Ctrl = new PlayerController("a","v","d")
	const player2Ctrl = new PlayerController("ArrowLeft","m","ArrowRight")

	const updateKeys = function(event) {
		player1Ctrl.updateKeys(event)
		player2Ctrl.updateKeys(event)
	}

	game.world.addPlayer("#FF00FF",player1Ctrl)
	game.world.addPlayer("#FF0000",player2Ctrl)
	console.log(game.world.players)


	const render = function() {
		display.fill("rgba(0,0,0,0.99)");
		display.drawMap(game.world.map,game.world.tile_size)
		for (let player of game.world.players) {
			display.drawRectangle(player.x,player.y,player.width,player.height,player.color)
		}
		display.render();
	}

	let locationOnBuffer;
	const paint = function(event) {
		
		paintController.updateClick(event)
		locationOnBuffer = display.findClickLocation(event)

	}

	let tileType = 1;
	let switched = false;
	const update = function() {

		if (paintController.mouseDown) {
			tileType = paintController.number
			tileX = Math.floor(locationOnBuffer.x / game.world.tile_size)
			tileY = Math.floor(locationOnBuffer.y / game.world.tile_size)
			game.world.map[tileY][tileX] = tileType;
		}

		if (paintController.rightMouseDown) {
			tileX = Math.floor(locationOnBuffer.x / game.world.tile_size)
            tileY = Math.floor(locationOnBuffer.y / game.world.tile_size)
			game.world.map[tileY][tileX] = 0;
		}

		for (let p of game.world.players) {
			if (p.controls.right) {
				p.moveRight()
			}
			if (p.controls.left) {
				p.moveLeft()
			}
			if (p.controls.up) {
				p.jump()
			}
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

	window.addEventListener("keydown", updateKeys)
	window.addEventListener("keyup", updateKeys)
	window.addEventListener("resize", resize)
	document.querySelector("#canvas").addEventListener("mousedown", paint)
	document.querySelector("#canvas").addEventListener("mousemove", paint)
	document.querySelector("#canvas").addEventListener("mouseup", paint)

})
