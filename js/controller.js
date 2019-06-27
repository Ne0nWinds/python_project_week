const PaintController = function() {

	this.mouseDown = false;
	this.rightMouseDown = false;
	this.enter = false;
	this.esc = false;
	this.number = 0;

    this.updateKeys = (event) => {
        if (event.type == "keydown") {
            switch(event.key) {
				case "0": this.number = 0; break;
				case "1": this.number = 1; break;
				case "2": this.number = 2; break;
				case "3": this.number = 3; break;
				case "4": this.number = 4; break;
				case "Enter": this.enter = true; break;
				case "Escape": this.esc = true; break;
            }   
        } else if (event.type == "keyup") {
		    switch(event.key) {
				case "Enter": this.enter = false; break;
				case "Escape": this.esc = false; break;
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

const PlayerController = function(leftBtn,upBtn,rightBtn) {
	this.left = false;
	this.right = false;
	this.up = false;
	this.leftBtn = leftBtn;
	this.rightBtn = rightBtn;
	this.upBtn = upBtn;
	
	this.updateKeys = (event) => {
		
		if (event.type == "keydown") {
			switch(event.key) {
				case leftBtn: this.left = true; break;
				case rightBtn: this.right = true; break;
				case upBtn: this.up = true; break;
			}
		} else {
			switch(event.key) {
				case leftBtn: this.left = false; break;
				case rightBtn: this.right = false; break;
				case upBtn: this.up = false; break;
			}
		}

	}
}

