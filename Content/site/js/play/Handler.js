/**
 * Created by fredrik.svahn on 20/11/15.
 */

function Handler() {
    this.ObjectList = [];

    this.tick = function() {
        for(var i = 0; i < this.ObjectList.length; i++) {
            this.ObjectList[i].tick();
        }
    };

    this.draw = function() {
        for(var i = 0; i < this.ObjectList.length; i++) {
            this.ObjectList[i].draw();
        }
    };

    this.addObject = function(object) {
        this.ObjectList.push(object);
    };

    this.removeObject = function(object) {
        this.ObjectList.splice(this.ObjectList.indexOf(object), 1);
    };
}