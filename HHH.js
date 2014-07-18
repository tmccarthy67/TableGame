$(document).ready(function() {
  // Uses Modernizr.js to check for canvas support
  function canvasSupport() {
    return Modernizr.canvas;
  }

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

// if (window.navigator.msPointerEnabled) {
//   // Pointer events are supported.
// }

  canvasApp();

  function canvasApp() {
    var imageObj = null;

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
        var canvasRadius
      if (window.innerHeight < window.innerWidth) {
      canvasRadius = (window.innerHeight / 2) - 50;
      } else {
        canvasRadius = (window.innerWidth / 2) - 50;
      }
          canvasCenterX = window.innerWidth / 2;
          canvasCenterY = window.innerHeight / 2;
        var width = canvasRadius * 2;
        var circleUnit = Math.sqrt(2) / 2;
        var arena = {
          x: canvasCenterX,
          y: canvasCenterY,
          nextX: canvasCenterX,
          nextY: canvasCenterY,
          radius: canvasRadius,
          speed: 0,
          angle: 0,
          velocityX: 0,
          velocityY: 0,
          mass: 10 * canvasRadius
        };

        var numBalls = parseInt(width/36);
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

        var headOffset = parseInt(width/5);
        var vertNum = 5;
        var vertModifier = vertNum + 1;

        //Vetebrea
        var Atlas = new Array();
        var Axis = new Array();
        var C3 = new Array();
        var C4 = new Array();
        var C5 = new Array();
        var dragonHead = new Array();
        var tempRotation;

        imageObj = new Image();

          var images = new Array();
          var headImage = new Image();
          var scaleImage = new Image();

      // preloading all images
      function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
      }

      var sources = {
        head: 'images/head.png' /*dragon head image from http://www.clipartbest.com/clipart-LTKyEBrTa */,
        scales: 'images/scales.jpg' /*scale image from http://funny-quotes.picphotos.net/*/
      };

      loadImages(sources, function(images) {
        scaleImage = images.scales;
        headImage = images.head;
      });

 //       imageObj.src = 'images/head.png'; /*dragon head image from http://www.clipartbest.com/clipart-LTKyEBrTa */
        // imageObj.onload = function() {
        // }

      // Find spots to place each hippo body
      for (var i = 0; i < numHippos; i++) {
        tempRadiusHippoBody = parseInt(width/12);
        tempXHippoBody = tempRadiusHippoBody * 3 + (Math.floor(Math.random() * width) - tempRadiusHippoBody * 3);
        tempYHippoBody = tempRadiusHippoBody * 3 + (Math.floor(Math.random() * width) - tempRadiusHippoBody * 3);
        tempSpeedHippoBody = 0;
        tempAngleHippoBody = 0;
        tempRadiansHippoBody = 0;
        tempVelocityXHippoBody = 0;
        tempVelocityYHippoBody = 0;

        var HippoPosition1XBody = canvasCenterX - canvasRadius;
        var HippoPosition2XBody = canvasCenterX - circleUnit * canvasRadius;
        var HippoPosition3XBody = canvasCenterX;
        var HippoPosition4XBody = canvasCenterX + circleUnit * canvasRadius;
        var HippoPosition5XBody = canvasCenterX + canvasRadius;
        var HippoPosition1YBody = canvasCenterY - canvasRadius;
        var HippoPosition2YBody = canvasCenterY - circleUnit * canvasRadius;
        var HippoPosition3YBody = canvasCenterY;
        var HippoPosition4YBody = canvasCenterY + circleUnit * canvasRadius;
        var HippoPosition5YBody = canvasCenterY + canvasRadius;

        var HippoBodyX = [HippoPosition1XBody,HippoPosition2XBody,HippoPosition3XBody, HippoPosition4XBody,HippoPosition5XBody, HippoPosition4XBody,HippoPosition3XBody, HippoPosition2XBody]
        var HippoBodyY = [HippoPosition3YBody, HippoPosition4YBody, HippoPosition5YBody, HippoPosition4YBody, HippoPosition3YBody ,HippoPosition2YBody, HippoPosition1YBody ,HippoPosition2YBody]

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
        HippoBodies.push(tempHippoBody);
      };

      // Find spots to place each hippo head
      for (var i = 0; i < numHippos; i++) {
        tempRadiusHippo = parseInt(width/30);
        tempXHippo = tempRadiusHippo * 3 + (Math.floor(Math.random() * theCanvas.width) - tempRadiusHippo * 3);
        tempYHippo = tempRadiusHippo * 3 + (Math.floor(Math.random() * theCanvas.height) - tempRadiusHippo * 3);
        tempSpeedHippo = 0;
        tempAngleHippo = 0;
        tempRadiansHippo = 0;
        tempVelocityXHippo = 0;
        tempVelocityYHippo = 0;
        tempHippoCounter = 0;
        tempHeadRotation = 0;

        var headOffset = parseInt(width/5);

        var HippoPosition1X = canvasCenterX - canvasRadius + headOffset;
        var HippoPosition2X = canvasCenterX - (circleUnit * canvasRadius) + (circleUnit * headOffset);
        var HippoPosition3X = canvasCenterX;
        var HippoPosition4X = canvasCenterX + (circleUnit * canvasRadius) - (circleUnit * headOffset);
        var HippoPosition5X = canvasCenterX + canvasRadius - headOffset;
        var HippoPosition1Y = canvasCenterY - canvasRadius + headOffset;
        var HippoPosition2Y = canvasCenterY - (circleUnit * canvasRadius) + (circleUnit * headOffset);
        var HippoPosition3Y = canvasCenterY;
        var HippoPosition4Y = canvasCenterY + (circleUnit * canvasRadius) - (circleUnit * headOffset);
        var HippoPosition5Y = canvasCenterY + canvasRadius - headOffset;

        var HippoHeadX = [HippoPosition1X,HippoPosition2X,HippoPosition3X, HippoPosition4X,HippoPosition5X, HippoPosition4X,HippoPosition3X, HippoPosition2X]
        var HippoHeadY = [HippoPosition3Y, HippoPosition4Y, HippoPosition5Y, HippoPosition4Y, HippoPosition3Y ,HippoPosition2Y, HippoPosition1Y, HippoPosition2Y]

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
          rotation: tempHeadRotation,
          counter: tempHippoCounter

        };
        Hippos.push(tempHippo);
      }

      //Atlas
      for (var i = 0; i < numHippos; i++) {

        var hippo = Hippos[i];
        var hippoBodies = HippoBodies[i];

        tempSpeedHippo = 0;
        tempAngleHippo = 0;
        tempRadiansHippo = 0;
        tempVelocityXHippo = 0;
        tempVelocityYHippo = 0;
          var vertRadiusMod = (hippoBodies.radius - hippo.radius) / (vertModifier + 1);
        tempRadiusAtlas = (hippo.radius - vertRadiusMod);

          var vertXmod = (hippoBodies.x - hippo.x) / vertModifier;
          var vertYmod = (hippoBodies.y - hippo.y) / vertModifier;
        tempAtlasX = hippo.x + vertXmod;
        tempAltasY = hippo.y + vertYmod;

        tempAtlas = {
          x: tempAtlasX,
          y: tempAltasY,
          nextX: tempAtlasX,
          nextY: tempAltasY,
          radius: tempRadiusAtlas,
          speed: tempSpeedHippo,
          angle: tempAngleHippo,
          velocityX: tempVelocityXHippo,
          velocityY: tempVelocityYHippo,
          mass: tempRadiusAtlas,

        };
       Atlas.push(tempAtlas);
     };

      //Axis
      for (var i = 0; i < numHippos; i++) {

        var hippo = Hippos[i];
        var hippoBodies = HippoBodies[i];
        var atlas = Atlas[i];

        tempSpeedHippo = 0;
        tempAngleHippo = 0;
        tempRadiansHippo = 0;
        tempVelocityXHippo = 0;
        tempVelocityYHippo = 0;
          var vertRadiusMod = (hippoBodies.radius - hippo.radius) / (vertModifier + 1);
        tempRadiusAxis = (atlas.radius + vertRadiusMod);

          var vertXmod = (hippoBodies.x - hippo.x) / vertModifier;
          var vertYmod = (hippoBodies.y - hippo.y) / vertModifier;
        tempAxisX = atlas.x + vertXmod;
        tempAxisY = atlas.y + vertYmod;

        tempAxis = {
          x: tempAxisX,
          y: tempAxisY,
          nextX: tempAxisX,
          nextY: tempAxisY,
          radius: tempRadiusAxis,
          speed: tempSpeedHippo,
          angle: tempAngleHippo,
          velocityX: tempVelocityXHippo,
          velocityY: tempVelocityYHippo,
          mass: tempRadiusAxis,

        };
       Axis.push(tempAxis);
     };

      //C3
      for (var i = 0; i < numHippos; i++) {

        var hippo = Hippos[i];
        var hippoBodies = HippoBodies[i];
        var atlas = Atlas[i];
        var axis = Axis[i];

        tempSpeedHippo = 0;
        tempAngleHippo = 0;
        tempRadiansHippo = 0;
        tempVelocityXHippo = 0;
        tempVelocityYHippo = 0;
          var vertRadiusMod = (hippoBodies.radius - hippo.radius) / (vertModifier + 1);
        tempRadiusC3 = (axis.radius + vertRadiusMod);

          var vertXmod = (hippoBodies.x - hippo.x) / vertModifier;
          var vertYmod = (hippoBodies.y - hippo.y) / vertModifier;
        tempC3X = axis.x + vertXmod;
        tempC3Y = axis.y + vertYmod;

        tempC3 = {
          x: tempC3X,
          y: tempC3Y,
          nextX: tempC3X,
          nextY: tempC3Y,
          radius: tempRadiusC3,
          speed: tempSpeedHippo,
          angle: tempAngleHippo,
          velocityX: tempVelocityXHippo,
          velocityY: tempVelocityYHippo,
          mass: tempRadiusC3,

        };
       C3.push(tempC3);
     };

      //C4
      for (var i = 0; i < numHippos; i++) {

        var hippo = Hippos[i];
        var hippoBodies = HippoBodies[i];
        var atlas = Atlas[i];
        var axis = Axis[i];
        var vertC3 = C3[i];

        tempSpeedHippo = 0;
        tempAngleHippo = 0;
        tempRadiansHippo = 0;
        tempVelocityXHippo = 0;
        tempVelocityYHippo = 0;
          var vertRadiusMod = (hippoBodies.radius - hippo.radius) / (vertModifier + 1);
        tempRadiusC4 = (vertC3.radius + vertRadiusMod);

          var vertXmod = (hippoBodies.x - hippo.x) / vertModifier;
          var vertYmod = (hippoBodies.y - hippo.y) / vertModifier;
        tempC4X = vertC3.x + vertXmod;
        tempC4Y = vertC3.y + vertYmod;

        tempC4 = {
          x: tempC4X,
          y: tempC4Y,
          nextX: tempC4X,
          nextY: tempC4Y,
          radius: tempRadiusC4,
          speed: tempSpeedHippo,
          angle: tempAngleHippo,
          velocityX: tempVelocityXHippo,
          velocityY: tempVelocityYHippo,
          mass: tempRadiusC4,

        };
       C4.push(tempC4);
     };

      //C5
      for (var i = 0; i < numHippos; i++) {

        var hippo = Hippos[i];
        var hippoBodies = HippoBodies[i];
        var atlas = Atlas[i];
        var axis = Axis[i];
        var vertC3 = C3[i];
        var vertC4 = C4[i];

        tempSpeedHippo = 0;
        tempAngleHippo = 0;
        tempRadiansHippo = 0;
        tempVelocityXHippo = 0;
        tempVelocityYHippo = 0;
          var vertRadiusMod = (hippoBodies.radius - hippo.radius) / (vertModifier + 1);
        tempRadiusC5 = (vertC4.radius + vertRadiusMod);

          var vertXmod = (hippoBodies.x - hippo.x) / vertModifier;
          var vertYmod = (hippoBodies.y - hippo.y) / vertModifier;
        tempC5X = vertC4.x + vertXmod;
        tempC5Y = vertC4.y + vertYmod;

        tempC5 = {
          x: tempC5X,
          y: tempC5Y,
          nextX: tempC5X,
          nextY: tempC5Y,
          radius: tempRadiusC5,
          speed: tempSpeedHippo,
          angle: tempAngleHippo,
          velocityX: tempVelocityXHippo,
          velocityY: tempVelocityYHippo,
          mass: tempRadiusC5,

        };
       C5.push(tempC5);
     };

      //Dragon Head
      for (var i = 0; i < numHippos; i++) {
        var hippo = Hippos[i];
        var tempDragonHead;
        var sizeRatio = (canvasRadius / 840);
        tempHeadX = hippo.x;
        tempHeadY = hippo.y;
        tempHeadWidth = 273 * sizeRatio;
        tempHeadHeight = 298 * sizeRatio;
        tempRotation = (- Math.PI / 2) - i * (Math.PI * 2) / numHippos;

        tempDragonHead = {
          HeadX: tempHeadX,
          HeadY: tempHeadY,
          HeadWidth: tempHeadWidth,
          HeadHeight: tempHeadHeight,
          Rotation: tempRotation
        };
        dragonHead.push(tempDragonHead);
     };

     //generates the balls
      var generateBall = function () {
        tempRadius = parseInt(width/100);
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

      // Returns true if a ball can start at location, otherwise returns false
      function canStartHere(ball) {
        var retVal = true;
        for (var i = 0; i < balls.length; i += 1) {
          if (hitTestCircle(ball, balls[i])) {
            retVal = false;
          }
        }
        return retVal;
      }

      // Collision test to see if two balls are touching
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

      // Collision test ball vs wall
      function hitBallWall (ball1, wall) {
        var retVal = false;
        var dx = ball1.nextX - wall.nextX;
        var dy = ball1.nextY - wall.nextY;
        var distance = (dx * dx + dy * dy);
        if (distance > (ball1.radius - wall.radius) * (ball1.radius - wall.radius) ) {
          retVal = true;
        }
        return retVal;
      }

    // Loops through all the balls and updates the nextX and nextY
    function update() {
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        ball.nextX = (ball.x += ball.velocityX);
        ball.nextY = (ball.y += ball.velocityY);
      }
    }

    // Loops through all the vertebra and updates the nextX and nextY
    function updateVert() {
      for (var i = 0; i < numHippos; i += 1) {
        var hippo = Hippos[i];
        var hippoBodies = HippoBodies[i];
        var AtlasC1 = Atlas[i];
        var AxisC2 = Axis[i];
        var vertC3 = C3[i];
        var vertC4 = C4[i];
        var vertC5 = C5[i];

        var vertXmod = (hippoBodies.x - hippo.x) / vertModifier;
        var vertYmod = (hippoBodies.y - hippo.y) / vertModifier;

        AtlasC1.nextX = hippo.x + vertXmod;
        AtlasC1.nextY = hippo.y + vertYmod;

        AxisC2.nextX = AtlasC1.x + vertXmod;
        AxisC2.nextY = AtlasC1.y + vertYmod;

        vertC3.nextX = AxisC2.x + vertXmod;
        vertC3.nextY = AxisC2.y + vertYmod;

        vertC4.nextX = vertC3.x + vertXmod;
        vertC4.nextY = vertC3.y + vertYmod;

        vertC5.nextX = vertC4.x + vertXmod;
        vertC5.nextY = vertC4.y + vertYmod;

      }
    }


    // Test ball vs wall
    var testWalls = function () {
      var ball;
      var floor;
      for (i = 0; i < balls.length; i++) {
        ball = balls[i];
        floor = arena;
          if (hitBallWall(ball, floor)) {
            collideBallWall(ball, floor);
          }
      }
    }

    // tests to make sure that ball is still in play
    var testBallLocation = function () {
      var ball;
      for (i = 0; i < balls.length; i++) {
        ball = balls[i];
        dBX = Math.pow((canvasCenterX - ball.x),2); //ball dist x from center
        dBY = Math.pow((canvasCenterY - ball.y),2); //ball dist y from center
        dAX = dAY = Math.pow((canvasRadius),2) //x and y distance arena
        if ((dBX > dAX) || (dBY > dAY)) {
          removeBall (ball);
        }
      }
    }

    // Updates properties of colliding ball and wall.
    function collideBallWall (ball1, wall) {
      var dx = ball1.nextX - wall.nextX;
      var dy = ball1.nextY - wall.nextY;
      var collisionAngle = Math.atan2(dy, dx);

      // Get velocities of each ball before collision
      var speed1 = Math.sqrt(ball1.velocityX * ball1.velocityX + ball1.velocityY * ball1.velocityY);
      var speed2 = 0;

      // Get angles (in radians) for each ball, given current velocities
      var direction1 = Math.atan2(ball1.velocityY, ball1.velocityX);
      var direction2 = 0;

      // Rotate velocity vectors so we can plug into equation for conservation of momentum
      var rotatedVelocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
      var rotatedVelocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
      var rotatedVelocityX2 = 0;
      var rotatedVelocityY2 = 0;

      // Update actual velocities using conservation of momentum
      /* Uses the following formulas:
      velocity1 = ((mass1 - mass2) * velocity1 + 2*mass2 * velocity2) / (mass1 + mass2)
      velocity2 = ((mass2 - mass1) * velocity2 + 2*mass1 * velocity1) / (mass1 + mass2)
      */
      var finalVelocityX1 = ((ball1.mass - wall.mass) * rotatedVelocityX1 + (wall.mass + wall.mass) * rotatedVelocityX2) / (ball1.mass + wall.mass);
      var finalVelocityX2 = ((ball1.mass + ball1.mass) * rotatedVelocityX1 + (wall.mass - ball1.mass) * rotatedVelocityX2) / (ball1.mass + wall.mass);

      // Y velocities remain constant
      var finalVelocityY1 = rotatedVelocityY1;
      var finalVelocityY2 = rotatedVelocityY2;

      // Rotate angles back again so the collision angle is preserved
      ball1.velocityX = Math.cos(collisionAngle) * finalVelocityX1 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityY1;
      ball1.velocityY = Math.sin(collisionAngle) * finalVelocityX1 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityY1;
      wall.velocityX = 0;
      wall.velocityY = 0;

      // Update nextX and nextY for both balls so we can use them in render() or another collision
      ball1.nextX += ball1.velocityX;
      ball1.nextY += ball1.velocityY;
      wall.nextX += wall.velocityX;
      wall.nextY += wall.velocityY;
    }

    // Tests whether any balls have hit each other.
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

    // Tests whether any balls have hit heads.
    var collideHippo = function () {
      var ball;
      var Hippo;
      for (var i = 0; i < balls.length; i++) {
        ball = balls[i];
        for (var j = 0; j < Hippos.length; j++) {
          hippo = Hippos[j];
          if (hitTestCircle(ball, hippo)) {
            removeBall (ball);
          }
        }
      }
    }

    // Tests whether any balls have hit hippo bodies.
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

    // Tests whether any balls have hit atlas.
    var collideAtlas = function () {
      var ball;
      var atlas;
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        for (var j = 0; j < HippoBodies.length; j += 1) {
          atlas = Atlas[j];
          if (hitTestCircle(ball, atlas)) {
            collideBallsHippoBody(ball, atlas);
          }
        }
      }
    }

    // Tests whether any balls have hit axis.
    var collideAxis = function () {
      var ball;
      var axis;
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        for (var j = 0; j < HippoBodies.length; j += 1) {
          axis = Axis[j];
          if (hitTestCircle(ball, axis)) {
            collideBallsHippoBody(ball, axis);
          }
        }
      }
    }

    // Tests whether any balls have hit C3.
    var collideC3 = function () {
      var ball;
      var c3;
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        for (var j = 0; j < HippoBodies.length; j += 1) {
          c3 = C3[j];
          if (hitTestCircle(ball, c3)) {
            collideBallsHippoBody(ball, c3);
          }
        }
      }
    }

    // Tests whether any balls have hit C4.
    var collideC4 = function () {
      var ball;
      var c4;
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        for (var j = 0; j < HippoBodies.length; j += 1) {
          c4 = C4[j];
          if (hitTestCircle(ball, c4)) {
            collideBallsHippoBody(ball, c4);
          }
        }
      }
    }

    // Tests whether any balls have hit C5.
    var collideC5 = function () {
      var ball;
      var c5;
      for (var i = 0; i < balls.length; i += 1) {
        ball = balls[i];
        for (var j = 0; j < HippoBodies.length; j += 1) {
          c5 = C5[j];
          if (hitTestCircle(ball, c5)) {
            collideBallsHippoBody(ball, c5);
          }
        }
      }
    }


    // Updates colliding balls so they appear to bounce off each other.
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

    // Updates colliding balls so they appear to bounce off hippo body.
    function collideBallsHippoBody (ball1, HippoBody) {
      var dx = ball1.nextX - HippoBody.nextX;
      var dy = ball1.nextY - HippoBody.nextY;
      var collisionAngle = Math.atan2(dy, dx);

      // Get velocities of each ball before collision
      var speed1 = Math.sqrt(ball1.velocityX * ball1.velocityX + ball1.velocityY * ball1.velocityY);
      var speed2 = 0;

      // Get angles (in radians) for each ball, given current velocities
      var direction1 = Math.atan2(ball1.velocityY, ball1.velocityX);
      var direction2 = 0;

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
      HippoBody.velocityY = 0;

      // Update nextX and nextY for both balls so we can use them in render() or another collision
      ball1.nextX += ball1.velocityX;
      ball1.nextY += ball1.velocityY;
      HippoBody.nextX += HippoBody.velocityX;
      HippoBody.nextY += HippoBody.velocityY;
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
          context.fillStyle = "#3BAF1F";
          for (i = 0; i < Hippos.length; i++) {
            Hippo = Hippos[i];
            Hippo.x = Hippo.nextX;
            Hippo.y = Hippo.nextY;
            context.beginPath();
            context.arc(Hippo.x, Hippo.y, Hippo.radius, 0, Math.PI *2, true);
            context.closePath();
            context.fill();
          }
        }

        //Add dragon to head
        var renderDragonHead = function () {
          var headdragon;

          for (i = 0; i < numHippos; i++) {
            headdragon = dragonHead[i];
            hippo = Hippos[i];
            headX = hippo.x;
            headY = hippo.y;
            headWidth = headdragon.HeadWidth;
            headHeight = headdragon.HeadHeight;
            headRotate = headdragon.Rotation;

            context.save();
            context.translate(headX, headY)
            context.rotate(headRotate);
            context.translate((- headWidth / 2), (- headHeight / 2));

            context.drawImage(headImage, 0, 0, headWidth, headHeight);
            context.restore();

          };
        }

        //*******
        // Draws and updates each hippo Body
        var renderHippoBodies = function () {
          var HippoBody;
          context.fillStyle = "#3BAF1F";
          for (var i = 0; i < Hippos.length; i++) {
            HippoBody = HippoBodies[i];
            HippoBody.x = HippoBody.x;
            HippoBody.y = HippoBody.y;
            context.beginPath();
            context.arc(HippoBody.x, HippoBody.y, HippoBody.radius, 0, Math.PI *2, true);

            // context.fillStyle = context.createPattern(scaleImage, 'repeat');

            // var imageObj = new Image();
            // imageObj.onload = function() {
            //   var pattern = context.createPattern(imageObj, 'repeat');
            //   context.fillStyle = pattern;
            //   context.fill();
            // };
            // imageObj.src = 'scales.jpg';

            context.closePath();
            context.fill();
          }
        }

    // Draws and updates Atlas
        var renderAtlas = function () {
          var AtlasC1;
          context.fillStyle = "#3BAF1F";
          for (var i = 0; i < Hippos.length; i++) {
            AtlasC1 = Atlas[i];
            AtlasC1.x = AtlasC1.nextX;
            AtlasC1.y = AtlasC1.nextY;
            context.beginPath();
            context.arc(AtlasC1.x, AtlasC1.y, AtlasC1.radius, 0, Math.PI *2, true);
            context.closePath();
            context.fill();
          }
        }

    // Draws and updates Axis
        var renderAxis = function () {
          var AxisC2;
          context.fillStyle = "#3BAF1F";
          for (var i = 0; i < Hippos.length; i++) {
            AxisC2 = Axis[i];
            AxisC2.x = AxisC2.nextX;
            AxisC2.y = AxisC2.nextY;
            context.beginPath();
            context.arc(AxisC2.x, AxisC2.y, AxisC2.radius, 0, Math.PI *2, true);
            context.closePath();
            context.fill();
          }
        }

    // Draws and updates C3
        var renderC3 = function () {
          var vertC3;
          context.fillStyle = "#3BAF1F";
          for (var i = 0; i < Hippos.length; i++) {
            vertC3 = C3[i];
            vertC3.x = vertC3.nextX;
            vertC3.y = vertC3.nextY;
            context.beginPath();
            context.arc(vertC3.x, vertC3.y, vertC3.radius, 0, Math.PI *2, true);
            context.closePath();
            context.fill();
          }
        }

    // Draws and updates C4
        var renderC4 = function () {
          var vertC4;
          context.fillStyle = "#3BAF1F";
          for (var i = 0; i < Hippos.length; i++) {
            vertC4 = C4[i];
            vertC4.x = vertC4.nextX;
            vertC4.y = vertC4.nextY;
            context.beginPath();
            context.arc(vertC4.x, vertC4.y, vertC4.radius, 0, Math.PI *2, true);
            context.closePath();
            context.fill();
          }
        }

    // Draws and updates C5
        var renderC5 = function () {
          var vertC5;
          context.fillStyle = "#3BAF1F";
          for (var i = 0; i < Hippos.length; i++) {
            vertC5 = C5[i];
            vertC5.x = vertC5.nextX;
            vertC5.y = vertC5.nextY;
            context.beginPath();
            context.arc(vertC5.x, vertC5.y, vertC5.radius, 0, Math.PI *2, true);
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
      var canvasReset = function () {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
      }

    canvasReset();

    // Reset Play Area
    var playAreaReset = function () {
      context.beginPath();
      context.arc(canvasCenterX, canvasCenterY, canvasRadius - 1, 0, Math.PI * 2, true);
      context.fillStyle = "#EEEEEE";
      context.fill();
    }

      playAreaReset ();

      // Outside border
    var borderReset = function () {
      context.beginPath();
      context.arc(canvasCenterX, canvasCenterY, canvasRadius, 0, Math.PI * 2, true);
      context.lineWidth = 2;
      context.strokeStyle = "#000000";
      context.stroke();
    }

      borderReset();

      // Outside
    var borderClear = function () {
      borderSize = width * circleUnit
      context.beginPath();
      context.arc(canvasCenterX, canvasCenterY, canvasRadius + borderSize, 0, Math.PI * 2, true);
      context.lineWidth = (borderSize * 2);
      context.strokeStyle = "#ffffff";
      context.stroke();
    }

      update();
      updateVert();
      testWalls();
      testBallLocation();
      collide();
      collideHippoBodies();
      collideAtlas();
      collideAxis();
      collideC3();
      collideC4();
      collideC5();
      collideHippo();
      renderBall();
      renderHippoBodies();
      renderC5();
      renderC4();
      renderC3();
      renderAxis();
      renderAtlas();
      renderHippo();
      renderDragonHead();
      borderClear();

}
var Canvas = document.getElementById('canvasOne')

//Handle Touch and Move
Canvas.addEventListener("touchstart", touchHandler, false);

//Verify if point was within the bounds of an actual hippo
function touchHandler (event) {

  // var touches = event.changedTouches;
  var touches = event.changedTouches;

  for (j = 0; j < touches.length; j++) {
    for (var i = 0; i < numHippos; i++) {
        var hippo = Hippos[i];
        var hippoBody = HippoBodies[i];
        var touchEvent = event.touches[j];
        if (hippoHit(hippo, touchEvent)) {
Canvas.addEventListener("touchmove", moveTheHippoHandler(hippo, hippoBody, touchEvent.identifier), false);
Canvas.addEventListener("touchend", touchRelease(hippo, hippoBody, touchEvent.identifier), false);
       }
    }
  }
};

    //Verify pixels clicked by pointer are within bounds of a hippo head
    var hippoHit = function(hippo, touchEvent) {
      var hippoX = hippo.x;
      var hippoY = hippo.y;
      var radius = hippo.radius;

      x = touchEvent.clientX;
      y = touchEvent.clientY;

    	var minX = hippoX - radius;
      var maxX = hippoX + radius;
      var minY = hippoY - radius;
    	var maxY = hippoY + radius;
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            return true;
        }
        else {
            return false;
        }

    }


   //moving the head
   function moveTheHippoHandler (hippo, hippoBody, touchId) {
    var thisTouch = touchId;
    console.log('touch move');
    var f1 = function (event) {
      var touches = event.changedTouches;
      for (j = 0; j < touches.length; j++) {
        if (touches[j].identifier == thisTouch)
        hippo.nextX = event.touches[j].clientX;
        hippo.nextY = event.touches[j].clientY;
         if (neckLength (hippo, hippoBody)) {
          console.log('good neck length');
        }
        else {
          console.log('neck TOO long');
          hippo.nextX = hippo.x;
          hippo.nextY = hippo.y;
        }
      }
    }
    return f1;
  }

//*************

    // check head to body distance
    var neckLength = function (hippo, hippoBody) {
       for (i = 0; i < numHippos; i++) {
        // hippo = Hippos[i];
        // hippoBody = HippoBodies[i];
        dX = hippo.nextX - hippoBody.x;
        dY = hippo.nextY - hippoBody.y;
        dist = (dX * dX) + (dY * dY);

        if (headOffset * headOffset >= dist) {
          return true;
        } else {
          return false;
        }
      }
    }


   function touchRelease (hippo, hippoBody, touchId) {
    var f1 = function (event) {
      var touches = event.changedTouches;
      for (j = 0; j < touches.length; j++) {
        if (touches[j].identifier == touchId)
          console.log('end touch');
        }

      }
    return f1;
  }




//end
}

});
