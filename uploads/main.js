function createImage(imageObj) {
        var canvas = document.getElementById('example');
        var context = canvas.getContext('2d');
        var imageX = 0;
        var imageY = 0;
        var imageWidth = imageObj.width; 
        var imageHeight = imageObj.height;
        var columns = [];
        var acontext = new window.webkitAudioContext();
        var matrix = [], iterationIndex = 0;

        context.drawImage(imageObj, imageX, imageY);

        for (var idx = 0, line = imageWidth; idx < line; idx += 1) {
          var pixelData = context.getImageData(idx, 0, 1, imageHeight);
          columns.push(pixelData);
        };
/*        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        console.log(columns);
        console.log('::: C O L U M N S   P A R S E D ::::::::::::::::::::::::');
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
*/               
        

        function playSound () {
          this.osc.frequency.value = this.blue;
          this.osc.play();
        }

        function Sound(opt) {
          this.i    = opt.index ;
          this.w    = opt.width ;
          this.h    = opt.height;
          this.r    = opt.red   ;
          this.g    = opt.green ;
          this.b    = opt.blue  ;
        };

        for(var widthIndex = 0, m = columns.length ; widthIndex < m; widthIndex++ ) {
          var allPixels   = columns[widthIndex].data.length,
              heightIndex = 0;
          iterationIndex = iterationIndex + 1;
          for(var pixelIndex = 0; pixelIndex < allPixels; pixelIndex += 4) {
            var data    = columns[widthIndex].data,
                options = {
                  index : iterationIndex      ,
                  width : widthIndex          ,
                  height: heightIndex         ,
                  red   : data[pixelIndex]    ,
                  green : data[pixelIndex + 1],
                  blue  : data[pixelIndex + 2]
                },
                sound = new Sound(options);
            matrix.push(sound);
            iterationIndex = iterationIndex + 1 ;
            heightIndex    = heightIndex    + 1 ;
          }
        }          

        window.quene = 0;

        window.rOsc = acontext.createOscillator();
        rOsc.connect(acontext.destination);
        // rOsc.type = 'square';
        
        window.bOsc = acontext.createOscillator();
        bOsc.connect(acontext.destination);
        // bOsc.type = 'triangle';

        window.gOsc = acontext.createOscillator();
        gOsc.connect(acontext.destination);
        // bOsc.type = 'sine';

        rOsc.start();
        bOsc.start();
        gOsc.start(); 

        setTimeout(function () {
          playMatrix();
        }, 2000);

        function runTime (argument) {
          setTimeout(function () {
            playMatrix();
          }, 10);
        }

        function playMatrix (mtx) {
            window.quene = quene +1;
            if(quene < matrix.length){
              rOsc.frequency.value = matrix[quene].r + 200;
              bOsc.frequency.value = matrix[quene].b + 200;
              gOsc.frequency.value = matrix[quene].g + 200;
              runTime();
            } else {
              rOsc.stop();
              bOsc.stop();
              gOsc.stop();
              alert('over');
            }
        }
      };

      var imageObj = new Image();
      imageObj.onload = function() {       
         createImage(this);
      };
      

      // imageObj.src = 'http://localhost:3000/jss.png';
      imageObj.src = 'http://localhost:3000/jss.png';