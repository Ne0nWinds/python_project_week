const Display = function(canvas,width,height) {

    this.context = canvas.getContext("2d");
    this.buffer = document.createElement("canvas").getContext("2d");
    this.buffer.canvas.width = this.context.canvas.width = width;
    this.buffer.canvas.height = this.context.canvas.height = height;
	this.ratioX = 1;
	this.ratioY = 1;
	this.mousePos = {"x":0,"y":0};

    this.fill = function(color) {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(0,0,this.buffer.canvas.width,this.buffer.canvas.height);

    };  

    this.drawRectangle = function(x,y,w,h,color) {
    
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.round(x),Math.round(y),w,h);

    };  
    
    this.drawMap = function(map,tile_size) {

		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[0].length; x++) {
				switch (map[y][x]) {
					case 1: this.drawRectangle(x*tile_size,y*tile_size,tile_size,tile_size,"white"); break; // Normal
					case 2: this.drawRectangle(x*tile_size,y*tile_size,tile_size,tile_size/2,"gray"); break; // Skinny
					case 3: this.drawRectangle(x*tile_size,y*tile_size,tile_size,tile_size,"blue"); break; // Bouncy
					case 4: this.drawRectangle(x*tile_size,y*tile_size,tile_size,tile_size,"green"); break; // Teleport
				}
			}
		}
    
    }   

	this.drawText = function(text,x,y,font_size,color,textAlign="center") {
        this.buffer.fillStyle = color;
		this.buffer.font = font_size + 'px arial';
		this.buffer.textAlign = textAlign;
		this.buffer.fillText(text, x, y);
	}

	this.findClickLocation = (event) => {
		if (event.type == "mousedown" || event.type == "mousemove") {

			return {
				'x':event.offsetX * this.ratioX,
				'y':event.offsetY * this.ratioY,
			}

		}
	}
	this.mouseLocation = (event) => {
		if (event.type == "mousemove") {

			this.mousePos = {"x":event.offsetX * this.ratioX,"y":event.offsetY * this.ratioY}
		}
	}


    this.render = function(top=0,right=0,bottom=0,left=0) {
        this.context.drawImage(this.buffer.canvas, left, top, this.buffer.canvas.width - left- right, this.buffer.canvas.height - top - bottom, 0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    this.resize = function(w,h,ratio) {
        if (h / w > ratio) {
            this.context.canvas.height = w * ratio;
            this.context.canvas.width = w;
        } else {
            this.context.canvas.height = h;
            this.context.canvas.width = h / ratio;
        }

        this.context.imageSmoothingEnabled = false;
		this.ratioX = this.buffer.canvas.width / this.context.canvas.width
		this.ratioY = this.buffer.canvas.height / this.context.canvas.height
    };

};

