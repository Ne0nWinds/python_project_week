function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
function genColor() {
	let color = "#" + Math.floor((Math.random() * (16777216 - 363636)) + 363636).toString(16);
	if (color.length != 7) {color = color.slice(0, 1) + "0" + color.slice(1, 6); }
	return color;
}
window.addEventListener("load", function() {

	const game = new Game();
	const display = new Display(document.querySelector("#canvas"),game.world.width,game.world.height);
	const paintController = new PaintController()
	const menu = new Menu()

	const updateKeys = function(event) {
		paintController.updateKeys(event)
		for (p of game.world.players) {
			p.controls.updateKeys(event)
		}
	}

	const render = function() {
		if (game.world.game_state == "game" ) {
			display.fill("rgba(0,0,0,0.99)");
			display.drawMap(game.world.map,game.world.tile_size);
			for (let player of game.world.players) {
				display.drawRectangle(player.x,player.y,player.width,player.height,player.color);
			}
		} else if (game.world.game_state == "paint") {
			display.fill("rgba(0,0,0,0.99)");
			if (!userPainted) {
				display.drawText("Use the mouse and numkeys to make a level",game.world.width / 2,game.world.height*1/5,"18","white")
			}
			display.drawMap(game.world.map,game.world.tile_size);
		} else if (menu.state == "title") {
			display.fill("black");
			display.drawText("Title",game.world.width /2,game.world.height*1/3,48,"white");
			display.drawText("Press Enter to Continue",game.world.width /2,game.world.height*3/4,"14","white");
		} else if (menu.state == "player_select") {
			display.fill("black");
			display.drawText("Use the numpad to set the number of players",game.world.width / 2,game.world.height*1/10,"24","white")
			display.drawText("Current Number of Players : " + game.world.players.length, game.world.width / 2, game.world.height / 2,"24","white")
			playerCount = game.world.players.length
			for (let i = 0; i < playerCount; i++) {
				display.drawRectangle(i*game.world.width/(playerCount+1) + game.world.width/(playerCount+1) - 10,game.world.height * 3/4,16,16,game.world.players[i].color)
				display.drawText("player " + (i+1),i*game.world.width/(playerCount+1) + game.world.width/(playerCount + 1),game.world.height * 3/4 + 30,"15","white")
			}
		}
			
			display.render();
	}

	let locationOnBuffer = {};
	const paint = function(event) {
		
		paintController.updateClick(event)
		locationOnBuffer = display.findClickLocation(event)

	}

	let tileType = 1;
	let enterUp = false;
	let userPainted = false;
	const update = function() {
		
		if (game.world.game_state == "paint") {
			if (paintController.mouseDown) {
				userPainted = true;
				tileType = paintController.number;
				tileX = Math.floor(locationOnBuffer.x / game.world.tile_size);
				tileY = Math.floor(locationOnBuffer.y / game.world.tile_size);
				game.world.map[tileY][tileX] = tileType;
				if (tileType == 4) { // Adds teleport coordinates to array if they're not already in it
					let coordinates = {"x":tileX,"y":tileY};
					let found = false;
					for (node of game.world.teleport_nodes) {
						if (node.x == tileX && node.y == tileY) {
							found = true;
						}
					}
					if (!found) { game.world.teleport_nodes.push(coordinates); }
				}
				if (tileType == 0) { game.world.clear_teleporter(tileX, tileY); }
			}

			if (paintController.rightMouseDown) {
				tileX = Math.floor(locationOnBuffer.x / game.world.tile_size);
				tileY = Math.floor(locationOnBuffer.y / game.world.tile_size);
				if (game.world.map[tileY][tileX] == 4) { game.world.clear_teleporter(tileX, tileY); }
				game.world.map[tileY][tileX] = 0;
			}

			if (paintController.enter && enterUp) {
				game.world.generateSpawnPoints()
				if (game.world.spawn_points.length > 0) {
					game.world.game_state = "game"
				}
			}
			if (!paintController.enter) {
				enterUp = true;
			}

		} else if (game.world.game_state == "game") {

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
		} else if (menu.state == "title") {
			if (paintController.enter) {
				enterUp = false;
				menu.state = "player_select"
			}
		} else if (menu.state == "player_select") {
			if (paintController.number >= 0 && paintController.number <= menu.controls.length) {
				while (game.world.players.length < paintController.number) {
					keys = menu.controls[game.world.players.length]
					playerCtrls = new PlayerController(keys[0],keys[1],keys[2])
					game.world.addPlayer(genColor(),playerCtrls)
				}
				while (game.world.players.length > paintController.number) {
					game.world.players.pop()
				}
				if (paintController.enter && enterUp) {
					game.world.game_state = "paint"
					paintController.number = 1
					enterUp = false;
				}
				if (!paintController.enter) {
					enterUp = true;
				}
			}
		} 
	}
/*
	const player1Ctrl = new PlayerController("a","v","d")
	const player2Ctrl = new PlayerController("ArrowLeft","m","ArrowRight")

	const updateKeys = function(event) {
		player1Ctrl.updateKeys(event)
		player2Ctrl.updateKeys(event)
		paintController.updateKeys(event)
	}

	game.world.addPlayer("#FF00FF",player1Ctrl)
	game.world.addPlayer("#FF0000",player2Ctrl) */

	const engine = new Engine(120,update,render)
	engine.run()


	const resize = function() {
		display.resize(document.documentElement.clientWidth-64,document.documentElement.clientHeight-64,game.world.height/game.world.width)
		display.render()
	}
	resize()

	window.addEventListener("keydown", updateKeys)
	window.addEventListener("keyup", updateKeys)
	window.addEventListener("resize", resize)
	document.querySelector("#canvas").addEventListener("mousedown", paint)
	document.querySelector("#canvas").addEventListener("mousemove", paint)
	window.addEventListener("mouseup", paint)

})
