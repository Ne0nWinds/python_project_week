const Engine = function(frame_rate, update, render) {

    this.last_update = window.performance.now()
    this.time_behind = 0
    this.frame_step = 1000/frame_rate
    this.updated = false;
    this.update = update;
    this.render = render;

    this.run = function() {

        window.requestAnimationFrame(this.handleRun)
        this.time_behind = window.performance.now() - this.last_update

        while (this.time_behind >= this.frame_step) {
            this.update();
            this.updated = true;
            this.time_behind -= this.frame_step;
        }

        if (this.updated) {
            this.render();
            this.updated = false;
            this.last_update = window.performance.now()
        }

    }
    this.handleRun = () => {
        this.run()
    }

}

