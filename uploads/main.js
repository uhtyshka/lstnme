function createImage(imageObj) {
        var canvas = document.getElementById('example');
        var context = canvas.getContext('2d');
        var imageX = 0;
        var imageY = 0;
        var imageWidth = imageObj.width; 
        var imageHeight = imageObj.height;

        context.drawImage(imageObj, imageX, imageY);
	      console.log(imageObj.width);

        var matrix = [];
        var acontext = new window.webkitAudioContext();
        for (var idx = 0, line = imageWidth; idx < line; idx += 1) {
          var pixelData = context.getImageData(idx, 0, 1, imageHeight);
          matrix.push(pixelData)
        };
        
        console.log(':::::::::::::::::::::::::::');
        console.log(matrix);
        console.log(':::::::::::::::::::::::::::');
        console.log('Poehali!');

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
        }
      }
      var imageObj = new Image();
      imageObj.onload = function() {       
         createImage(this);
      };
      imageObj.src = 'http://localhost:3000/colors.png';



/*
  var context = new window.webkitAudioContext();

var osc = context.createOscillator(); osc.frequency.value = 440; osc.connect(context.destination); osc.start(0);
var gain = context.createGain(); gain.gain.value = 100;
gain.connect(osc.frequency);

var osc2 = context.createOscillator();
osc2.frequency.value = 1;
osc2.connect(gain);
osc2.start(0);*/



