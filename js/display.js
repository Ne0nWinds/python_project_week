const Display = function(canvas,width,height) {

    this.context = canvas.getContext("2d");
    this.buffer = document.createElement("canvas").getContext("2d");
    this.buffer.canvas.width = this.context.canvas.width = width;
    this.buffer.canvas.height = this.context.canvas.height = height;
	this.ratioX = 1
	this.ratioY = 1
	this.lastGridClick = {}

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
				if (map[y][x] == 1) {
					this.drawRectangle(x*tile_size,y*tile_size,tile_size,tile_size,"white")
				}
			}
		}
    
    }   

	this.findClickLocation = (event) => {
		if (event.type == "mousedown") {
			this.lastGridClick = {
				"x":(event.offsetX * this.ratioX),
				"y":(event.offsetY * this.ratioY),
			}
		}

	}

    this.render = function() {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
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

