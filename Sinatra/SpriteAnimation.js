/**
 * Created by axel.ingelssonfredle on 29/01/16.
 */


function Spritsheet_image(path, frameWidth, frameHeight) {
    var spritesheet_image = new Image();
    var framesPerRow;

    var self = this;
    spritesheet_image.onload = function() {
        framesPerRow = Math.floor(spritesheet_image.width / frameWidth);
    };

    spritesheet_image.src = "Public/images/spritesheet.png";

    function SpriteAnimation(path, frameWidth, frameHeight, frameSpeed, endFrame) {

    var currentFrame = 0;
    var counter = 0;

    this.update = function() {
        if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % endFrame;

        counter = (counter + 1) % frameSpeed;

        this.draw = function(x, y) {
            var row = Math.floor(currentFrame / framesPerRow);
            var column = Math.floor(currentFrame % framesPerRow);

            ctx.drawimage(spritesheet_image,
                column * frameWidth, row * frameHeight,
                frameWidth,
                frameHeight,
                x, y,
                frameWidth,
                frameHeight);


            )
        }
    }

}
}

