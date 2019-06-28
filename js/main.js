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
		if (game.world.game_state == "game") {
			display.fill("rgba(0,0,0,0.99)");
			display.drawMap(game.world.map,game.world.tile_size);
			playerCount = game.world.players.length
			for (let i = 0; i < playerCount;i++) {
				display.drawRectangle(i*120/(playerCount+1) + 15,15,8,8,game.world.players[i].color)
				display.drawText(game.world.players[i].score,i*120/(playerCount + 1) + 25,23,10,"white","left")
			}
			for (let player of game.world.players) {
				display.drawRectangle(player.x,player.y,player.width,player.height,player.color);
			}
			if (game.world.winner != false) {
				display.drawText("Player " + game.world.winner + " Wins",game.world.width / 2,game.world.height*1/5,"18","white")
			}
		} else if (game.world.game_state == "paint") {
			display.fill("rgb(0,0,0)");
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
		
		gp = navigator.getGamepads()
		gplength = 0;
		if (game.world.game_state == "paint") {
			if (paintController.mouseDown) {
				userPainted = true;
				tileType = paintController.number;
				tileX = Math.floor(locationOnBuffer.x / game.world.tile_size);
				tileY = Math.floor(locationOnBuffer.y / game.world.tile_size);
				game.world.map[tileY][tileX] = tileType;
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

			for (let i = 0; i < game.world.players.length; i++) {
				if (game.world.players[i].score >= game.world.win_score) {
					game.world.winner = i + 1;
					break;
				}
			}
			if (game.world.winner != false && ( paintController.enter || paintController.esc )) {
				game.world.game_state = "menu";
				paintController.number = game.world.players.length;
				game.world.players = [];
				game.world.winner = false;
				enterUp = false;
			}

			// gamepad input
			for (let i = 0; i < gp.length;i++) {
				if (gp[i] != null) {
					if (gp[i].buttons[0].pressed) {
						game.world.players[i].jump()
						game.world.players[i].jump_active = false;
					} else {
						game.world.players[i].jump_active = true;
					}
					if (gp[i].axes[0] > 0.25) {
						moveMod = (gp[i].axes[i] - 0.25) / 0.75
						game.world.players[i].moveRight(moveMod);
					}
					if (gp[i].axes[0] < -0.25) {
						moveMod = ((gp[i].axes[i] + 0.25) / 0.75) * -1
						game.world.players[i].moveLeft(moveMod);
					}
				}
			}

			for (let i = 0; i < game.world.players.length;i++) {
				if (!gp[i]) {
					p = game.world.players[i]
					if (p.controls.right) {
						p.moveRight()
					}
					if (p.controls.left) {
						p.moveLeft()
					}
					if (p.controls.up) {
						p.jump()
						p.jump_active = false;
					} else {
						p.jump_active = true;
					}
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
				for (let i = 0; i < gp.length;i++) {
					if (gp[i] != null) {
						gplength++;
					}
				}
				while (game.world.players.length < paintController.number) {
					keys = menu.controls[game.world.players.length]
					playerCtrls = new PlayerController(keys[0],keys[1],keys[2])
					game.world.addPlayer(genColor(),playerCtrls)
					
				}
				while (game.world.players.length > paintController.number) {
					game.world.players.pop()
				}
				if (paintController.enter && enterUp && paintController.number >= 1) {
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
	window.addEventListener("gamepaddisconnected", function (e) {
		if (menu.state == "player_select") {
			if (paintController.number > 0) {
				paintController.number -= 1;
			}
		}
	})
	window.addEventListener("gamepadconnected", function (e) {
		if (menu.state == "player_select") {
			if (paintController.number < 4) {
				paintController.number += 1;
			}
		}
	})

})
