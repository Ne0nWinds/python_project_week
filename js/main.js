window.addEventListener("load", function() {

	const game = new Game();
	const display = new Display(document.querySelector("#canvas"),game.world.width,game.world.height);
	const controller = new Controller();

	const render = function() {
		display.fill("black");
		display.drawRectangle(game.world.player.x,game.world.player.y,game.world.player.width,game.world.player.height,game.world.player.color)
		display.render();
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

	const engine = new Engine(60,update,render)
	engine.start()


	const resize = function() {
		display.resize(document.documentElement.clientWidth-128,document.documentElement.clientHeight-128,game.world.height/game.world.width)
		display.render()
	}
	resize()

	window.addEventListener("keydown", controller.updateKeys)
	window.addEventListener("keyup", controller.updateKeys)
	window.addEventListener("resize", resize)

})
