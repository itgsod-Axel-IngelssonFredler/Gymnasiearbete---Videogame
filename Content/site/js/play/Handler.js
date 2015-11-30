/**
 * Created by fredrik.svahn on 20/11/15.
 */

function Handler(context) {
    this.ObjectList = [];
    this.context = context;


    this.tick = function() {
        for(var i = 0; i < this.ObjectList.length; i++) {
            this.ObjectList[i].tick();
        }
    };

    this.draw = function() {
        for(var i = 0; i < this.ObjectList.length; i++) {
            this.ObjectList[i].draw(this.context);
        }
    };

    this.addObject = function(object) {
        this.ObjectList.push(object);
    };

    this.removeObject = function(object) {
        this.ObjectList.splice(this.ObjectList.indexOf(object), 1);
    };

    this.keydown = function(e) {
        for(var i = 0; i < this.ObjectList.length; i++) {
            var tempObject = this.ObjectList[i];

            switch(tempObject.id) {
                case "PLAYER":
                if (e.keyCode == 37) {
                    tempObject.moveLeft = 1;
                }
                if (e.keyCode == 38) {
                    tempObject.moveUp = 1;
                }
                if (e.keyCode == 39) {
                    tempObject.moveRight = 1;
                }
                if (e.keyCode == 40) {
                    tempObject.moveDown = 1;
                }
                    break;
                default:

            }
        }
    };

    this.keyup = function(e) {
        for(var i = 0; i < this.ObjectList.length; i++) {
            var tempObject = this.ObjectList[i];
            switch(tempObject.id) {
                case "PLAYER":
                    if (e.keyCode == 37) {
                        tempObject.moveLeft = 0;
                    }
                    if (e.keyCode == 38) {
                        tempObject.moveUp = 0;
                    }
                    if (e.keyCode == 39) {
                        tempObject.moveRight = 0;
                    }
                    if (e.keyCode == 40) {
                        tempObject.moveDown = 0;
                    }
                    break;
                default:

            }
        }
    }


}