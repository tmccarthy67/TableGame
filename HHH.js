$(document).ready(function() {
  // Uses Modernizr.js to check for canvas support
  function canvasSupport() {
    return Modernizr.canvas;
  }

  canvasApp();

  function canvasApp() {
    // Check for canvas support
    if (!canvasSupport()) {
      return;
    } else {
      // Grab the canvas and set the context to 2d
      var theCanvas = document.getElementById('canvasOne');
      var context = theCanvas.getContext("2d");
      theCanvas.width = window.innerWidth;
      theCanvas.height = window.innerHeight;
    }

// Variables
    var width = window.innerWidth;
    var numBalls = parseInt(width/30);
    var maxSize = 15;
    var minSize = 5;
    var maxSpeed = maxSize + 5;
    var balls = new Array();
    var tempBall;
    var tempX;
    var tempY;
    var tempSpeed;
    var tempAngle;
    var tempRadius;
    var tempRadians;
    var tempVelocityX;
    var tempVelocityY;

    var numHippos = 8;  // number of Hippos
    var maxSizeHippo = 15;
    var minSizeHippo = 5;
    var maxSpeedHippo = maxSizeHippo + 5;
    var Hippos = new Array();
    var tempHippo;
    var tempXHippo;
    var tempYHippo;
    var tempSpeedHippo;
    var tempAngleHippo;
    var tempRadiusHippo;
    var tempRadiansHippo;
    var tempVelocityXHippo;
    var tempVelocityYHippo;
    var tempHippoCounter;

    var HippoBodies = new Array();
    var tempHippoBody;
    var tempRadiusHippoBody;
    var tempXHippoBody;
    var tempYHippoBody;

// Find spots to place each hippo body
    for (var i = 0; i < numHippos; i++) {
      tempRadiusHippoBody = parseInt(width/24);
      var placeOK = false;
      while (!placeOK) {
        tempXHippoBody = tempRadiusHippoBody * 3 + (Math.floor(Math.random() * theCanvas.width) - tempRadiusHippoBody * 3);
        tempYHippoBody = tempRadiusHippoBody * 3 + (Math.floor(Math.random() * theCanvas.height) - tempRadiusHippoBody * 3);
        tempSpeedHippoBody = 0;
        tempAngleHippoBody = 0;
        tempRadiansHippoBody = 0;
        tempVelocityXHippoBody = 0;
        tempVelocityYHippoBody = 0;

        var HippoPositionZeroXBody = 0;
        var HippoPositionHalfXBody = theCanvas.width/2;
        var HippoPositionFullXBody = theCanvas.width;
        var HippoPositionZeroYBody = 0;
        var HippoPositionHalfYBody = theCanvas.height/2;
        var HippoPositionFullYBody = theCanvas.height;

        var bodyOffset = parseInt(width/48)

        var HippoBodyX = [HippoPositionZeroXBody+bodyOffset,HippoPositionZeroXBody,HippoPositionZeroXBody + bodyOffset, HippoPositionHalfXBody,HippoPositionHalfXBody, HippoPositionFullXBody - bodyOffset,HippoPositionFullXBody, HippoPositionFullXBody - bodyOffset]
        var HippoBodyY = [HippoPositionZeroYBody + bodyOffset, HippoPositionHalfYBody, HippoPositionFullYBody - bodyOffset, HippoPositionZeroYBody, HippoPositionFullYBody ,HippoPositionZeroYBody + bodyOffset, HippoPositionHalfYBody ,HippoPositionFullYBody - bodyOffset]

        tempXHippoBody = HippoBodyX[i];
        tempYHippoBody = HippoBodyY[i];

        tempHippoBody = {
          x: tempXHippoBody,
          y: tempYHippoBody,
          nextX: tempXHippoBody,
          nextY: tempYHippoBody,
          radius: tempRadiusHippoBody,
          speed: tempSpeedHippoBody,
          angle: tempAngleHippoBody,
          velocityX: tempVelocityXHippoBody,
          velocityY: tempVelocityYHippoBody,
          mass: tempRadiusHippoBody
        };
        placeOK = canStartHere(tempHippoBody);
      }
      HippoBodies.push(tempHippoBody);
    }

    // Find spots to place each hippo head
    for (var i = 0; i < numHippos; i++) {
      tempRadiusHippo = parseInt(width/60);
      var placeOK = false;
      while (!placeOK) {
        tempXHippo = tempRadiusHippo * 3 + (Math.floor(Math.random() * theCanvas.width) - tempRadiusHippo * 3);
        tempYHippo = tempRadiusHippo * 3 + (Math.floor(Math.random() * theCanvas.height) - tempRadiusHippo * 3);
        tempSpeedHippo = 0;
        tempAngleHippo = 0;
        tempRadiansHippo = 0;
        tempVelocityXHippo = 0;
        tempVelocityYHippo = 0;
        tempHippoCounter = 0;

        var headOffset = parseInt(width/10);

        var HippoPositionZeroX = headOffset
        var HippoPositionHalfX = theCanvas.width/2
        var HippoPositionFullX = theCanvas.width - headOffset
        var HippoPositionZeroY = headOffset
        var HippoPositionHalfY = theCanvas.height/2
        var HippoPositionFullY = theCanvas.height - headOffset

        var HippoHeadX = [HippoPositionZeroX, HippoPositionZeroX, HippoPositionZeroX, HippoPositionHalfX, HippoPositionHalfX, HippoPositionFullX, HippoPositionFullX, HippoPositionFullX]
        var HippoHeadY = [HippoPositionZeroY, HippoPositionHalfY, HippoPositionFullY, HippoPositionZeroY, HippoPositionFullY, HippoPositionZeroY, HippoPositionHalfY, HippoPositionFullY]

        tempXHippo = HippoHeadX[i];
        tempYHippo = HippoHeadY[i];

        tempHippo = {
          x: tempXHippo,
          y: tempYHippo,
          nextX: tempXHippo,
          nextY: tempYHippo,
          radius: tempRadiusHippo,
          speed: tempSpeedHippo,
          angle: tempAngleHippo,
          velocityX: tempVelocityXHippo,
          velocityY: tempVelocityYHippo,
          mass: tempRadiusHippo,
          counter: tempHippoCounter

        };
        placeOK = canStartHere(tempHippo);
      }
      Hippos.push(tempHippo);
    }

    var generateBall = function () {
      tempRadius = parseInt(width/240);
      tempX = tempRadius * 3 + (Math.floor(Math.random() * ((theCanvas.width)/8)+(theCanvas.width)*7/16) - tempRadius * 3);
      tempY = tempRadius * 3 + (Math.floor(Math.random() * ((theCanvas.height)/8)+(theCanvas.height)*7/16) - tempRadius * 3);
      tempSpeed = 5;
      tempAngle = Math.floor(Math.random() * 360);
      tempRadians = tempAngle * Math.PI/180;
      tempVelocityX = Math.cos(tempRadians) * tempSpeed;
      tempVelocityY = Math.sin(tempRadians) * tempSpeed;

      tempBall = {
        x: tempX,
        y: tempY,
        nextX: tempX,
        nextY: tempY,
        radius: tempRadius,
        speed: tempSpeed,
        angle: tempAngle,
        velocityX: tempVelocityX,
        velocityY: tempVelocityY,
        mass: tempRadius
      };
      placeOK = canStartHere(tempBall);
    }

    // Find spots to place each ball so none start on top of each other
    for (var i = 0; i < numBalls; i += 1) {
      tempRadius = 5;
      var placeOK = false;
      while (!placeOK) {
        generateBall ();
      }
      balls.push(tempBall);
    }

    // Drawing interval
    setInterval(drawScreen, 33);

    // Returns true if a ball can start at given location, otherwise returns false
    function canStartHere(ball) {
      var retVal = true;
      for (var i = 0; i < balls.length; i += 1) {
        if (hitTestCircle(ball, balls[i])) {
          retVal = false;
        }
      }
      return retVal;
    }

    // Circle collision test to see if two balls are touching
    // Uses nextX and nextY to test for collision before it occurs
    // also using this function for ball vs body and ball vs head
    function hitTestCircle (ball1, ball2) {
      var retVal = false;
      var dx = ball1.nextX - ball2.nextX;
      var dy = ball1.nextY - ball2.nextY;
      var distance = (dx * dx + dy * dy);
      if (distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius) ) {
        retVal = true;
      }
      return retVal;
    }

// try using hitTestCircle for this function with ball1,hippo1 as inputs
// Test to see if ball collides with hippo
//passed test this function is no longer used
    // var hitHippoBall  = function (ball1,hippo1) {
    //   var retVal =false;
    //   var dxx = ball1.nextX - hippo1.nextX;
    //   var dyy = ball1.nextY - hippo1.nextY;
    //   var distance = (dxx * dxx + dyy * dyy);
    //   if (distance <= (ball1.radius + hippo1.radius) * (ball1.radius + hippo1.radius) ) {
    //     retVal = true;
    //   }
    //   return retVal;
    // }

// try using hitTestCircle for this function with ball1,hippo1 as inputs
// Test to see if ball collides with hippo body
//passed test this function is no longer used
    // var hitHippoBodyBall  = function (ball1,hippoBody1) {
    //   var retVal =false;
    //   var dxx = ball1.nextX - hippoBody1.nextX;
    //   var dyy = ball1.nextY - hippoBody1.nextY;
    //   var distance = (dxx * dxx + dyy * dyy);
    //   if (distance <= (ball1.radius + hippoBody1.radius) * (ball1.radius + hippoBody1.radius) ) {
    //     retVal = true;
    //   }
    //   return retVal;
    // }

    // Loops through all the balls in the balls array and updates the nextX and nextY properties
    // with current x and y velocities for each ball
    function update() {
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        ball.nextX = (ball.x += ball.velocityX);
        ball.nextY = (ball.y += ball.velocityY);
      }
    }

    // We track balls by their center, so we test for all collision by adding or subtracting
    // each ball's radius before testing for wall collision
    function testWalls () {
      var ball;
      var testBall;

      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];

        if (ball.nextX + ball.radius > theCanvas.width) { // right wall
          ball.velocityX = ball.velocityX * (-1);
          ball.nextX = theCanvas.width - ball.radius;

        } else if (ball.nextX - ball.radius < 0) { // top wall
          ball.velocityX = ball.velocityX * (-1);
          ball.nextX = ball.radius;

        } else if (ball.nextY + ball.radius > theCanvas.height) { // bottom wall
          ball.velocityY = ball.velocityY * (-1);
          ball.nextY = theCanvas.height - ball.radius;

        } else if (ball.nextY - ball.radius < 0) { // left wall
          ball.velocityY = ball.velocityY * (-1);
          ball.nextY = ball.radius;
        }
      }
    }

    // Tests whether any balls have hit each other.
    // Uses two next loops to iterate through the balls array and test each ball against every other ball.
    function collide () {
      var ball;
      var testBall;
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        for (var j = i + 1; j < balls.length; j += 1) {
          testBall = balls[j];
          if (hitTestCircle(ball, testBall)) {
            collideBalls(ball, testBall);
          }
        }
      }
    }

    // Tests whether any balls have hit hippos.
    // Uses two next loops to iterate through the balls array and test each ball against every hippo.
    var collideHippo = function () {
      var ball;
      var Hippo;
      for (var i = 0; i < balls.length; i++) {
        ball = balls[i];
        for (var j = 0; j < Hippos.length; j++) {
          hippo = Hippos[j];
          if (hitTestCircle(ball, hippo)) {
            collideBallsHippo(ball, hippo);
          }
        }
      }
    }

    // Tests whether any balls have hit hippo bodies.
    // Uses two next loops to iterate through the balls array and test each ball against every hippo body.
    var collideHippoBodies = function () {
      var ball;
      var HippoBody;
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        for (var j = 0; j < HippoBodies.length; j += 1) {
          HippoBody = HippoBodies[j];
          if (hitTestCircle(ball, HippoBody)) {
            collideBallsHippoBody(ball, HippoBody);
          }
        }
      }
    }

    // Updates properties of colliding balls so they appear to bounce off each other.
    // Uses nextX and nextY properties because we don't want to change where they are at the moment.
    function collideBalls (ball1, ball2) {
      var dx = ball1.nextX - ball2.nextX;
      var dy = ball1.nextY - ball2.nextY;
      var collisionAngle = Math.atan2(dy, dx);

      // Get velocities of each ball before collision
      var speed1 = Math.sqrt(ball1.velocityX * ball1.velocityX + ball1.velocityY * ball1.velocityY);
      var speed2 = Math.sqrt(ball2.velocityX * ball2.velocityX + ball2.velocityY * ball2.velocityY);

      // Get angles (in radians) for each ball, given current velocities
      var direction1 = Math.atan2(ball1.velocityY, ball1.velocityX);
      var direction2 = Math.atan2(ball2.velocityY, ball2.velocityX);

      // Rotate velocity vectors so we can plug into equation for conservation of momentum
      var rotatedVelocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
      var rotatedVelocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
      var rotatedVelocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
      var rotatedVelocityY2 = speed2 * Math.sin(direction2 - collisionAngle);

      // Update actual velocities using conservation of momentum
      /* Uses the following formulas:
           velocity1 = ((mass1 - mass2) * velocity1 + 2*mass2 * velocity2) / (mass1 + mass2)
           velocity2 = ((mass2 - mass1) * velocity2 + 2*mass1 * velocity1) / (mass1 + mass2)
           */
           var finalVelocityX1 = ((ball1.mass - ball2.mass) * rotatedVelocityX1 + (ball2.mass + ball2.mass) * rotatedVelocityX2) / (ball1.mass + ball2.mass);
           var finalVelocityX2 = ((ball1.mass + ball1.mass) * rotatedVelocityX1 + (ball2.mass - ball1.mass) * rotatedVelocityX2) / (ball1.mass + ball2.mass);

      // Y velocities remain constant
      var finalVelocityY1 = rotatedVelocityY1;
      var finalVelocityY2 = rotatedVelocityY2;

      // Rotate angles back again so the collision angle is preserved
      ball1.velocityX = Math.cos(collisionAngle) * finalVelocityX1 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityY1;
      ball1.velocityY = Math.sin(collisionAngle) * finalVelocityX1 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityY1;
      ball2.velocityX = Math.cos(collisionAngle) * finalVelocityX2 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityY2;
      ball2.velocityY = Math.sin(collisionAngle) * finalVelocityX2 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityY2;

      // Update nextX and nextY for both balls so we can use them in render() or another collision
      ball1.nextX += ball1.velocityX;
      ball1.nextY += ball1.velocityY;
      ball2.nextX += ball2.velocityX;
      ball2.nextY += ball2.velocityY;
    }

    // Updates properties of colliding balls so they appear to bounce off each other.
    // Uses nextX and nextY properties because we don't want to change where they are at the moment.
    function collideBallsHippoBody (ball1, HippoBody) {
      var dx = ball1.nextX - HippoBody.nextX;
      var dy = ball1.nextY - HippoBody.nextY;
      var collisionAngle = Math.atan2(dy, dx);

      // Get velocities of each ball before collision
      var speed1 = Math.sqrt(ball1.velocityX * ball1.velocityX + ball1.velocityY * ball1.velocityY);
      var speed2 = 0;
      //Math.sqrt(HippoBody.velocityX * HippoBody.velocityX + HippoBody.velocityY * HippoBody.velocityY);

      // Get angles (in radians) for each ball, given current velocities
      var direction1 = Math.atan2(ball1.velocityY, ball1.velocityX);
      var direction2 = 0;
      //Math.atan2(HippoBody.velocityY, HippoBody.velocityX);

      // Rotate velocity vectors so we can plug into equation for conservation of momentum
      var rotatedVelocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
      var rotatedVelocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
      var rotatedVelocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
      var rotatedVelocityY2 = speed2 * Math.sin(direction2 - collisionAngle);

      // Update actual velocities using conservation of momentum
      /* Uses the following formulas:
           velocity1 = ((mass1 - mass2) * velocity1 + 2*mass2 * velocity2) / (mass1 + mass2)
           velocity2 = ((mass2 - mass1) * velocity2 + 2*mass1 * velocity1) / (mass1 + mass2)
           */
           var finalVelocityX1 = ((ball1.mass - HippoBody.mass) * rotatedVelocityX1 + (HippoBody.mass + HippoBody.mass) * rotatedVelocityX2) / (ball1.mass + HippoBody.mass);
           var finalVelocityX2 = ((ball1.mass + ball1.mass) * rotatedVelocityX1 + (HippoBody.mass - ball1.mass) * rotatedVelocityX2) / (ball1.mass + HippoBody.mass);

      // Y velocities remain constant
      var finalVelocityY1 = rotatedVelocityY1;
      var finalVelocityY2 = rotatedVelocityY2;

      // Rotate angles back again so the collision angle is preserved
      ball1.velocityX = 1.5 * Math.cos(collisionAngle) * finalVelocityX1 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityY1;
      ball1.velocityY = 1.5 * Math.sin(collisionAngle) * finalVelocityX1 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityY1;
      HippoBody.velocityX = 0;
      //Math.cos(collisionAngle) * finalVelocityX2 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityY2;
      HippoBody.velocityY = 0;
      //Math.sin(collisionAngle) * finalVelocityX2 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityY2;

      // Update nextX and nextY for both balls so we can use them in render() or another collision
      ball1.nextX += ball1.velocityX;
      ball1.nextY += ball1.velocityY;
      HippoBody.nextX += HippoBody.velocityX;
      HippoBody.nextY += HippoBody.velocityY;
    }

    // Stops the balls.
    var collideBallsHippo = function (ball1, hippo1) {
      removeBall (ball1);
    }

 //remove ball
 var removeBall = function (ball1) {
    var removeThisBall = balls.indexOf(ball1);
    balls.splice(removeThisBall,1)
      ballCount ()
}

var ballCount = function () {
 if (balls.length < numBalls) {
  addBall ();
}
}

var addBall = function () {
  generateBall ();
  balls.push(tempBall);
}

    // Draws and updates each hippo
    var renderHippo = function () {
      var Hippo;
      context.fillStyle = "#ff0000";
      for (var i = 0; i < Hippos.length; i++) {
        Hippo = Hippos[i];
        Hippo.x = Hippo.nextX;
        Hippo.y = Hippo.nextY;
        context.beginPath();
        context.arc(Hippo.x, Hippo.y, Hippo.radius, 0, Math.PI *2, true);
        context.closePath();
        context.fill();
      }
    }

    // Draws and updates each hippo Body
    var renderHippoBodies = function () {
      var HippoBody;
      context.fillStyle = "#ff0000";
      for (var i = 0; i < Hippos.length; i++) {
        HippoBody = HippoBodies[i];
        HippoBody.x = HippoBody.nextX;
        HippoBody.y = HippoBody.nextY;
        context.beginPath();
        context.arc(HippoBody.x, HippoBody.y, HippoBody.radius, 0, Math.PI *2, true);
        context.closePath();
        context.fill();
      }
    }

    // Draws and updates each ball
    function renderBall () {
      var ball;
      context.fillStyle = "#000000";
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        ball.x = ball.nextX;
        ball.y = ball.nextY;

        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI *2, true);
        context.closePath();
        context.fill();
      }
    }

    // Draws/updates the screen
    function drawScreen () {
      // Reset canvas
      context.fillStyle = "#EEEEEE";
      context.fillRect(0, 0, theCanvas.width, theCanvas.height);

      // Outside border
      context.strokeStyle = "#000000";
      context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

      update();
      testWalls();
      collide();
      collideHippo();
      collideHippoBodies();
      renderBall();
      renderHippo();
      renderHippoBodies();

    }
  }

});