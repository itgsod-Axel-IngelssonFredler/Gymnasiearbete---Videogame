

function collisioncheck(list) { //This function checks if two pre-made objects are colliding with each other

        if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
            console.log("The objects are colliding") }
        else {
            console.log("The objects are not colliding")
        }

        }

var object1 = {x:49,y:49, height: 50, width: 50}; //On this line and the line below we define the two objects used in the function above
var object2 = {x:0,y:0, height: 50, width: 50};
} 
collisioncheck(list);
list = []
list


