function createImage(imageObj) {
        var canvas = document.getElementById('example');
        var context = canvas.getContext('2d');
        var imageX = 0;
        var imageY = 0;
        var imageWidth = imageObj.width; 
        var imageHeight = imageObj.height;

        context.drawImage(imageObj, imageX, imageY);
	      console.log(imageObj.width);

        var columns = [];
        var acontext = new window.webkitAudioContext();
        for (var idx = 0, line = imageWidth; idx < line; idx += 1) {
          var pixelData = context.getImageData(idx, 0, 1, imageHeight);
          columns.push(pixelData)
        };
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        console.log(columns);
        console.log('::: C O L U M N S   P A R S E D ::::::::::::::::::::::::');
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
               
        var matrix = [], iterationIndex = 0;

        function playSound () {
          this.osc.frequency.value = this.blue;
          this.osc.play();
        }

        function Sound(opt) {
          var osc = acontext.createOscillator();
          osc.connect(acontext.destination);
          osc.frequency.value = opt.blue;
          this.o    = osc       ;
          this.i    = opt.index ;
          this.w    = opt.width ;
          this.h    = opt.height;
          this.r    = opt.red   ;
          this.g    = opt.green ;
          this.b    = opt.blue  ;
          this.cb   = opt.next  ;
          this.play = playSound ;
        };
        for(var widthIndex = 0, m = columns.length/2 ; widthIndex < m; widthIndex++ ) {
          var allPixels   = columns[widthIndex].data.length/2,
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

        setTimeout(function () {
          playMatrix();
        }, 50);

        function runTime (argument) {
          setTimeout(function () {
            playMatrix();
          }, 50);
        }

        function playMatrix (mtx) {
            if(quene < matrix.length){
              if(quene) {
                matrix[quene].o.stop(matrix[quene].r/10);
              }
              window.quene = quene +1;
              matrix[quene].o.start();
              runTime();
            } else {
              alert('over');
            }
        }


// @TODO TRY TO RUN ONE OSC BUT CHANGE THE FREQ DINAMICLY. IF IT WILL WORK, THAT TRY TO RUN FEW OSC WHICH BINDED TO RED GREEN AND BLUE


        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        console.log(matrix);
        console.log('::: M A T R I X   C R E A T E D ::::::::::::::::::::::::');
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');

/*
        var time = 1000;
        var index;
        for(var wi = 0, m = matrix.length; wi < m; wi++ ) {
          for(var i = 0, n = matrix[wi].data.length; i < n; i += 4) {
            var data = matrix[wi].data;
            var red = data[i];
            var green = data[i + 1];
            var blue = data[i + 2];
            var alpha = data[i + 3];
            index = wi
            setTimeout(function (argument) {
              var osc = acontext.createOscillator();
              osc.connect(acontext.destination);
              osc.type = 'sawtooth'
              osc.frequency.value = blue+200;
              osc.start(0);
              osc.stop(index/2);
            }, time);
            time += 1000;
          }
        } */
      }
      var imageObj = new Image();
      imageObj.onload = function() {       
         createImage(this);
      };
      imageObj.src = 'http://localhost:3000/circle.gif';



/*
  var context = new window.webkitAudioContext();

var osc = context.createOscillator(); osc.frequency.value = 440; osc.connect(context.destination); osc.start(0);
var gain = context.createGain(); gain.gain.value = 100;
gain.connect(osc.frequency);

var osc2 = context.createOscillator();
osc2.frequency.value = 1;
osc2.connect(gain);
osc2.start(0);*/



