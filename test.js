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
        head: 'images/head.png' /*dragon head image from http://www.clipartbest.com/clipart-LTKyEBrTa */
,
        scales: 'images/scales.jpg' /*scale image from http://funny-quotes.picphotos.net/*/
      };

      loadImages(sources, function(images) {
        // context.drawImage(images.darthVader, 100, 30, 200, 137);
        // context.drawImage(images.yoda, 350, 55, 93, 104);
      });