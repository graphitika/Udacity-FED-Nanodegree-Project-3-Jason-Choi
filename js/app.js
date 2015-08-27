// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += Math.round(Math.random() * 100) * dt;

// Check bug location for game stage edges
    if (this.x > 500) {
    this.x = -(Math.round(Math.random()*500));
    }

// Collision Testing for enemy hitting player call
    collisionCourse(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    // function not used
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset the player to original position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Keyboard press events for player movement and game boundries
Player.prototype.handleInput = function(keys) {
    switch(keys) {
        case 'up':
            if(this.y > 40) {
                this.y -= 90;
        } else {
            // Player is reset if goes beyond top boundry and hits water - return if void
            player.reset();
            }
            break;
         case 'down':
            if(this.y < 375) {
                this.y += 90;
            }
            break;
        case 'left':
            if(this.x > 40) {
                this.x -= 100;
            }
            break;
        case 'right':
            if(this.x < 400) {
                this.x += 100;
            }
            break;
        default:
            return;
    }
};

// Collision Testing for enemy hitting player
var collisionCourse = function(enemyHit) {
    if ((enemyHit.x - player.x < 70 && enemyHit.y - player.y < 50) &&
        (enemyHit.x - player.x > -70 && enemyHit.y - player.y > -50)) {
        player.reset();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var enemy1 = new Enemy(Math.round(Math.random()*-220),60);
var enemy2 = new Enemy(Math.round(Math.random()*-220),140);
var enemy3 = new Enemy(Math.round(Math.random()*-220),220);

allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player

var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});