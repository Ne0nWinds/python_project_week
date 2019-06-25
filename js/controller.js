const Controller = function() {

    this.left = false;
    this.right = false;
    this.up = false;
	this.mousedown = false;

    this.updateKeys = (event) => {
        if (event.type == "keydown") {
            switch(event.key) {
                case "ArrowLeft": this.left = true; break;
                case "ArrowRight": this.right = true; break;
                case " ": this.up = true; break;
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
			this.mousedown = true
		} else {
			this.mousedown = false;
		}
	}

};

