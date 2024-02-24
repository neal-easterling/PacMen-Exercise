var pos = 0;
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

var game;
var gameRect;
window.onload = ()=>{
  game = document.getElementById('game');
  gameRect = game.getBoundingClientRect();
}

function setToRandom(minX, maxX, minY, maxY) {
    return {
        x: Math.random() * (maxX - minX) + minX ,
        y: Math.random() * (maxY - minY) + minY
    }
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(1, 10, 1, 10); // {x:?, y:?}
    let position = setToRandom(gameRect.left + 10, gameRect.right - 110, gameRect.top + 10, gameRect.bottom - 110);
    // Add image to div id = game
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = './images/PacMan1.png';
    newimg.width = 100;
    newimg.style.left = `${position.x}px`;
    newimg.style.top = `${position.y}px`;
    game.appendChild(newimg);
    console.log('new pac made');
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}
function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
      checkCollisions(item)
      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;

      item.newimg.style.left = `${item.position.x}px`;
      item.newimg.style.top = `${item.position.y}px`;
  })
  setTimeout(update, 20);
}
function checkCollisions(item) {
    if(item.position.x + item.velocity.x + item.newimg.width > gameRect.right|| item.position.x + item.velocity.x < gameRect.left){
      item.velocity.x = -item.velocity.x;
    }
    if(item.position.y+ item.velocity.y + item.newimg.height > gameRect.bottom|| item.position.y + item.velocity.y < gameRect.top){
      item.velocity.y = -item.velocity.y;
    }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}