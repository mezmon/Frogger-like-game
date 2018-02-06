window.addEventListener("load", function() {
  //constants
  var GAME_WIDTH = 640;
  var GAME_HEIGHT = 360;

  //enemies
  var enemies = [{
      x: 100, //x coordinate
      y: 100, //y coordinate
      speedY: 1, //speed in Y
      w: 40, //width
      h: 40 //heght
    },
    {
      x: 200,
      y: 100,
      speedY: 2,
      w: 40,
      h: 40
    },
    {
      x: 300,
      y: 100,
      speedY: 3,
      w: 40,
      h: 40
    },
    {
      x: 400,
      y: 100,
      speedY: 7,
      w: 40,
      h: 40
    },
    {
      x: 500, //x coordinate
      y: 100, //y coordinate
      speedY: 1, //speed in Y
      w: 40, //width
      h: 40 //heght
    }
  ];


  // player
  var player = {

    x: 10, //x coordinate
    y: 150, //y coordinate
    speedX: 4, //speed in Y
    w: 40, //width
    h: 40, //heght
    isMoving: false

  }
  // moving variables
  var movePlayer = function() { player.isMoving = true; };
  var stopPlayer = function() { player.isMoving = false; };
  //grab the canvas and context
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");

  //player mouse click
  canvas.addEventListener("mousedown", movePlayer);
  //player mouse release
  canvas.addEventListener("mouseup", stopPlayer);

  //player mouse click
  canvas.addEventListener("touchstart", movePlayer);
  //player mouse release
  canvas.addEventListener("touchend", stopPlayer);



  //update the logic
  var update = function() {

    //update for player
    if (player.isMoving) {
      player.x += player.speedX;
    }

    //keep playing x movment in bounds
    if (player.x >= 600) {
      player.x = 600;
      player.speedX = -player.speedX;
    }

    if (player.x <= 10) {
      player.x = 10;
      player.speedX = -player.speedX;
    }

    var i = 0;
    var n = enemies.length;

    //update the position of all enemies
    enemies.forEach(function(element, index) {
      element.y += element.speedY;

      // bounce enemies
      if (element.y <= 1) {
        element.y = 1;
        element.speedY = -element.speedY;
      };
      if (element.y >= GAME_HEIGHT - 40) {
        element.y = GAME_HEIGHT - 40;
        element.speedY = -element.speedY;
      };
    });


  };

  //show the game on the screen
  var draw = function() {
    //clear the canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);


    // draw player
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    //draw all enemies
    ctx.fillStyle = "#3333FF";
    enemies.forEach(function(element, index) {
      ctx.fillRect(element.x, element.y, element.w, element.h);
    });
    console.log(player.x);
  };

  //gets executed multiple times per second
  var step = function() {

    update();
    draw();

    window.requestAnimationFrame(step);
  };

  //initial kick
  step();
});
