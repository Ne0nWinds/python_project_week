const Controller = function() {

    this.left = false;
    this.right = false;
    this.up = false;
	this.mouseDown = false;
	this.rightMouseDown = false;
	this.number = 1;

    this.updateKeys = (event) => {
        if (event.type == "keydown") {
            switch(event.key) {
                case "ArrowLeft": this.left = true; break;
                case "ArrowRight": this.right = true; break;
                case " ": this.up = true; break;
				case "0": this.number = 0; break;
				case "1": this.number = 1; break;
				case "2": this.number = 2; break;
				case "3": this.number = 3; break;
				case "4": this.number = 4; break;
            }   
        } else {
            switch(event.key) {
                case "ArrowLeft": this.left = false; break;
                case "ArrowRight": this.right = false; break;
                case " ": this.up = false; break;
            }   
        }   
    };  

	this.updateClick = (event) => {
		if (event.type == "mousedown") {
			switch (event.which) {
				case 1: this.mouseDown = true; break;
				case 3: this.rightMouseDown = true; break;
			}
		} else if (event.type == "mouseup") {
			switch (event.which) {
				case 1: this.mouseDown = false; break;
				case 3: this.rightMouseDown = false; break;
			}
		}
	}

};
