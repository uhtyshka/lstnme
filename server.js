/*Define dependencies.*/

var express=require("express");
var multer  = require('multer');
var fs = require('fs');
var app=express();
var done=false;

app.set('view engine', 'jade');
app.use(express.static('./uploads/'));
/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
  }
}));

/*Handling routes.*/

app.get('/',function(req,res){
      res.sendfile("index.html");
});

app.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});

app.get('/photos', function (req, res) {
  fs.readdir('./uploads', function (err, files) {
    console.log(files)
    res.render('photos', {
      source: './uploads/',
      files : files
    });
/*    for (var i = files.length - 1; i >= 0; i--) {
      res.sendfile('./uploads/' + files[i]);
    }*/
  })
  //res.sendFile('./uploads/')
})

/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});