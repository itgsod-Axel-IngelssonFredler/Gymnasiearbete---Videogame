/**
 * Created by fredrik.svahn on 20/11/15.
 */

function Handler(context,keyHash) {
    this.keyHash = keyHash;
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
    
    this.keyAction = function() {
        for(var i = 0; i < this.ObjectList.length; i++) {
            this.ObjectList[i].keyAction(this.keyHash);
        }
    }
}