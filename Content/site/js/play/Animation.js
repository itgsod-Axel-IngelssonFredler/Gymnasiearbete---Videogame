/**
 * Created by fredrik.svahn on 30/11/15.
 */

function Animation(spritesheet, animationWidth, animationHeight) {
    this.index = 0;
    this.spritesheet = spritesheet;
    this.totalWidth = this.spritesheet.width;
    this.totalHeight = this.spritesheet.height;
    this.animationWidth = animationWidth;
    this.animationHeight = animationHeight;
    this.currentWidth = 0;
    this.currentHeight = 0;

    this.framesPerRow = Math.floor(this.totalWidth/this.animationWidth);
    this.rows = Math.floor(this.totalHeight/this.animationHeight);
    console.log(this.framesPerRow, this.rows);



    this.incrementIndex = function() {
        this.index += 1;
    };

    this.setCurrentDimensions = function() {
        this.currentHeight = this.index%this.rows*this.animationWidth;
        this.currentWidth = this.index%this.framesPerRow*this.animationHeight;
        console.log(this.currentWidth, this.currentHeight);
    };
}

