const Display = function(canvas,width,height) {

    this.context = canvas.getContext("2d");
    this.buffer = document.createElement("canvas").getContext("2d");
    this.buffer.canvas.width = this.context.canvas.width = width;
    this.buffer.canvas.height = this.context.canvas.height = height;

    this.fill = function(color) {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(0,0,this.buffer.canvas.width,this.buffer.canvas.height);

    };  

    this.drawRectangle = function(x,y,w,h,color) {
    
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.round(x),Math.round(y),w,h);

    };  
    
    this.drawMap = function(map,columns,tile_size) {

		for (let i = 0; i < map.length; i++) {
			if (map[i] == 1) {
				this.drawRectangle((i % columns)*columns,Math.floor(i / columns)*columns,tile_size,tile_size,"white")
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
    };

};

